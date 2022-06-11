import jwt  from "jsonwebtoken";

const createJWT = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET,

        {
            expiresIn: '30d'
        }
        
    )
}


export const createTokenRegister = (data) => {


    return jwt.sign({data}, process.env.JWT_SECRET,
        
        {
            expiresIn: '10h'
        }
        
    )
}
export const tokenEmailChange = (data) => {


    return jwt.sign({data}, process.env.JWT_SECRET,
        
        {
            expiresIn: '10h'
        }
    )
    
}
export default createJWT