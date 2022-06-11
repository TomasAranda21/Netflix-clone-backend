import express  from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import fileUpload from 'express-fileupload'

import conectDB from "./config/conectDB.js";
import usersRoutes from './routes/usersRoutes.js'

const app = express();

dotenv.config()

conectDB()

app.use(express.json())


app.use(fileUpload ({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// allow cors
const allowedDomains = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(allowedDomains.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error("No permitido por cors"))
        }

    }
}


app.use(cors(corsOptions))



app.use('/', usersRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(port)
})