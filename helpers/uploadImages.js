import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const __dirname = path.resolve()


const uploadFilesImg = ({ img }) => {

    return new Promise((resolve, reject) => {

        const nameSplit = img.name.split('.')
        const extension = nameSplit[ nameSplit.length - 1 ]
    
        // Extension validates
        const extensionValidate = ['jpg', 'png', 'jpeg']
    
        if(!extensionValidate.includes(extension)){

            return reject(`La extensión ${extension} no esta permitida, prueba con imagenes ${extensionValidate}`)
                
        }
    
    
        const nameImages = uuidv4() + '.' + extension
    
        const uploadPath = path.join( __dirname,  './upload/', nameImages )
    
    
        img.mv(uploadPath, (err) => {
    
            if(err){
                return reject(err)
            }
            
            resolve(nameImages)
    
        })
    })
}

export default uploadFilesImg