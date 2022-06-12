import fs from 'fs-extra'
import path from 'path';
import Profile from '../models/modelProfile.js'


import {uploadImage, deleteImage} from '../helpers/cloudinary.js'

const __dirname = path.resolve()



// ADD GET AND EDIT PROFILE



const addProfile = async (req, res) => {

    const {profile_name} = req.body


    const userHaveProfile = await Profile.find().where('users').equals(req.users._id)
    
    // If exist one profile stop
    if(Object.keys(userHaveProfile).length !== 0){

        const error = new Error (`Lo lamento pero por ahora no se puede tener mas de un perfil`)
                    
        return res.status(400).json({msg: error.message})
    }

    
    try {  
        if(req.files !== null){

            
            let img;
            
            if(req.files.img){

                // Add img to cludinary
                                
                    const result = await uploadImage(req.files.img.tempFilePath)
                    await fs.remove(req.files.img.tempFilePath)
                
                    img = {
                        url: result.secure_url,
                        public_id: result.public_id
                    }

                    const profile = new Profile({profile_name, img})

                    profile.users = req.users._id

                    const profileSaved = await profile.save()
                    
                    return res.json(profileSaved)

            }

        }
                
        const profile = new Profile({profile_name})

        profile.users = req.users._id

        const profileSaved = await profile.save()
            
        res.json(profileSaved)
    

        } catch (error) {
            
            console.log(error)
        }

}



    

 const updateProfile = async (req, res) => {

    const {id} = req.params

    let img;

    const profile = await Profile.findById(id)
    
    if(!profile){
        const error = new Error('No existe un perfil');
        return res.status(403).json({msg: error.message})
    }
  

    if(profile.users._id.toString() !== req.users._id.toString()) {

        const error = new Error('Acción no válida');
        return res.status(403).json({msg: error.message})

    }

    if(req.files === null || req.files === undefined){

        profile.profile_name = req.body.profile_name

        const updatedProfile = await profile.save()
        

        return res.json(updatedProfile)

    }

    try {

        if(req.files.img){

            // the user dont have an image
            if(profile.img.url === null || profile.img.url === undefined){

                let img;
                
                if(req.files.img){

                    // Add img to cludinary
                                    
                    const result = await uploadImage(req.files.img.tempFilePath)
                    await fs.remove(req.files.img.tempFilePath)
                
                    img = {
                        url: result.secure_url,
                        public_id: result.public_id
                    }

                    profile.profile_name = req.body.profile_name
                    profile.img = img

                    const profileSaved = await profile.save()
                    
                    return res.json(profileSaved)

                }

            }else{
                // the user have an image

                
                const imgId = profile.img.url.split('/')
    
                const imgEnd = imgId[ imgId.length - 1 ]
    
                const [ public_id ] = imgEnd.split('.')
                
    
                deleteImage( `netflix/${public_id}` )



                const result = await uploadImage(req.files.img.tempFilePath)
    
                img = {
                    url: result.secure_url,
                    public_id: result.public_id
                }
        
                profile.profile_name = req.body.profile_name
                profile.img = img
        
                const updatedProfile = await profile.save()
                
        
                return res.json(updatedProfile)
            }
    
        }
        
        } catch (error) {
            console.log(error)
        }
 }


    
const getProfile = async (req, res) => {
    const profile = await Profile.find().where('users').equals(req.users)

    
    if(!profile){
        const error = new Error('No existe un perfil')
        return res.status(400).json({msg: error.message})

    }

    res.json(profile)
}


export {
    getProfile,
    updateProfile,
    addProfile,
}