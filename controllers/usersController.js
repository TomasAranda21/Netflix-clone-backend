import jwt_decode from "jwt-decode";
import fs from 'fs-extra'


import Users from '../models/modelUsers.js'
import Movies from '../models/modelMovies.js'
import Profile from '../models/modelProfile.js'
import MyList from '../models/modelMyList.js'


import createJWT from '../helpers/createJWT.js'
import { createTokenRegister, tokenEmailChange } from '../helpers/createJWT.js'

import {uploadImage, deleteImage} from '../helpers/cloudinary.js'

import emailRegister from "../helpers/emailRegister.js";

import emailForgetPass from "../helpers/emailForgetPass.js";

import emailChange from "../helpers/emailChange.js";
import generateId from "../helpers/generateId.js";



const registerUsers = async (req, res) => {

    const { email, password } = req.body

    
    const userExists = await Users.findOne({ email})
    
    if(userExists){
        
        const error = new Error("Parece que esa cuenta ya existe. Inicia sesión en esa cuenta o prueba con otro email.")
        
        return res.status(400).json({msg: error.message})
        
    }
    
    try {


        const users = new Users(req.body)
    
        const userSaved = await users.save()

        // ======= send email ======= //
        emailRegister({
            email,
            token: userSaved.token
        })
    
        res.json(userSaved)

    } catch (error) {
        console.log(error)

    }

}



// ======= We confirm the user's account ======= //

const confirmUser = async (req, res) => {

    const { token } = req.params 


    const userConfirm = await Users.findOne({ token })

 
    
    if (!userConfirm){
        const error = new Error ('Token no valido')
        return res.status(400).json({msg: error.message})
    }
        
    try {
        
        userConfirm.confirmed = true;
        userConfirm.token = null;
        
        await userConfirm.save() 
        
        const {email, password} = userConfirm

        const jwtMail = createTokenRegister({email, password})

        res.json({jwtMail})

        
    } catch (error) {
        console.log(error)
    }
    
    
}



const authenticateUsers = async (req, res) => {

    const {email, password } = req.body

    const userExists = await Users.findOne({email})

    if(!userExists) {

        const error = new Error("No podemos encontrar una cuenta con esta dirección de email. Reinténtalo o crea una cuenta nueva.")

        return res.status(403).json({msg: error.message})

    }if(!userExists.confirmed){
        const error = new Error("El usuario no esta confimado por favor revisa tu email y confirme su cuenta")
 
        return res.status(403).json({msg: error.message})
    }

    if(await userExists.checkPassword(password)) {

        res.json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: createJWT(userExists.id)
        })
    }else{
        
        const error = new Error("Contraseña incorrecta. Reinténtalo o restablece la contraseña.")

        return res.status(403).json({msg: error.message})
    }
}





const authenticateAuto = async (req, res) => {
    const { jwtMail } = req.body

    
    const userData = jwt_decode(jwtMail)

    const {data} = userData
    
    const {email, password} = data

    const userExists = await Users.findOne({email})

    if(!userExists) {
        const error = new Error("No podemos encontrar una cuenta con esta dirección de email. Reinténtalo o crea una cuenta nueva.")

        return res.status(403).json({msg: error.message})

    }
        try {
            console.log(userExists._id)
            res.json({
                _id: userExists._id,
                email: userExists.email,
                token: createJWT(userExists.id)
            })
            
        } catch (error) {
            console.log(error)
        }
 
}





const getUser = async (req, res) => {

    const { users } = req

    const user = await Users.findById(users._id)

    res.json(user)
    
}




const editUser = async (req, res) => {

    const {id} = req.params

    const {name, email} = req.body

    const users = await Users.findById(id)
    
    if(!users){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }


    if(users.email !== req.body.email){

        const emailExist = await Users.findOne({email})

        if(emailExist){
            const error = new Error('Ese correo ya esta en uso')
            return res.status(400).json({msg: error.message})
        }
    }

    try {

        users.name = name;
        users.email = email;

        const userUpdated = await users.save()

        res.json(userUpdated)
        
    } catch (error) {
        console.log(error)
    }
}



const changePassword = async (req, res) => {

    const {id} = req.params


    const {current_pass, new_pass} = req.body

    const users = await Users.findById(id)

    if(!users){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }



    // update contraseña
    if(await users.checkPassword(current_pass)){

        users.password = new_pass

        await users.save()

        res.json({ msg: "Contraseña Actualizada Correctamente" })


    }else{

        const error = new Error('La Contraseña Actual es Incorrecta')
        return res.status(400).json({msg: error.message})

    }
}





const changeEmail = async (req, res) => {

    const { email } = req.body

    const userExist = await Users.findOne({email})
 

    if(!userExist){
        const error = new Error("El email ingresado no ha sido registrado")

        return res.status(403).json({msg: error.message})
    }

    try {
     
        userExist.token = generateId()

        await userExist.save()

        emailChange({
            email,
            token: userExist.token
        })


        res.json({msg: "Hemos enviado un mail con las instrucciones"})

    } catch (error) {
        console.log(error)
    }
}



// ==== Check Token To Change Password email

const checkToken = async (req, res) => {

    const { token } = req.params

    const checkToken = await Users.findOne({token})

    if (!checkToken){
        const error = new Error ('Token no valido')
        return res.status(400).json({msg: error.message})

    }else{

        res.json({msg: "Token válido el usuario existe"})
    }
}


// Complete changeEmail

const changeEmailCompleted = async (req, res) => {

    const { token } = req.params

    const {email} = req.body

    const existEmail = await Users.findOne({email})

    const users = await Users.findOne({token})



    if(existEmail){
        const error = new Error('El email introducido ya esta en uso')
        return res.status(400).json({msg: error.message})
    }

    try {

        users.email = email;
        users.token = null

        
        await users.save()

        res.json({msg: "Email Cambiado con exito"})

    }catch(error){
        console.log(error)
    }
}



// ==== PASSWORD

 const forgotPassword = async ( req, res) => {

    const { email } = req.body

    const userExist = await Users.findOne({email})


    if(!userExist){
        const error = new Error("El email ingresado no ha sido registrado")

        return res.status(403).json({msg: error.message})
    }

    try {
     
        userExist.token = generateId()

        await userExist.save()

        emailForgetPass({
            email,
            token: userExist.token
        })


        res.json({msg: "Hemos enviado un mail con las instrucciones"})

    } catch (error) {
        console.log(error)
    }
    
 }


 const checkTokenPass = async ( req, res) => {

    const { token } = req.params

    const checkToken = await Users.findOne({token})

    if (!checkToken){
        const error = new Error ('Token no valido')
        return res.status(400).json({msg: error.message})

    }else{

        res.json({msg: "Token válido el usuario existe"})
    }
 }


 const newPassword = async ( req, res) => {

    const { token } = req.params
    const { pass } = req.body 


    const users = await Users.findOne({token})

    if(!users){
        const error = new Error ('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    try {

        users.token = null
        users.password = pass
        await users.save()

        res.json({msg: 'Tu contraseña a sido restablecida con exito, Ahora puedes iniciar sesión'})
        
    } catch (error) {
        console.log(error)
    }

 }



export {
    registerUsers,
    authenticateUsers,
    getUser,
    editUser,
    changePassword,
    confirmUser,
    authenticateAuto,
    changeEmail,
    checkToken,
    changeEmailCompleted,
    forgotPassword,
    checkTokenPass,
    newPassword,
}