import jwt from 'jsonwebtoken'
import Users from '../models/modelUsers.js'


const checkAuth = async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {

            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.users = await Users.findById(decoded.id).select("password")

            return next()
            
        } catch (err) {

            const error = new Error("Token no valido o inexistente")

            return res.status(403).json({msg: error.message})
        }
    }

    if(!token){
        const error = new Error("Token no valido o inexistente")

        return res.status(403).json({msg: error.message})
    }

    next()

}

export default checkAuth