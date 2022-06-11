import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

const usersSchema = mongoose.Schema({

    name: {
        type: String,
        required: false,
        trim: true 
    },

    password: {
        type: String,
        required: true 
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    token: {
        type: String,
        default: generateId()
    },

    confirmed: {
        type: Boolean,
        default: false
    }


},
    {
        timestamps : true,
    }
)

usersSchema.pre('save', async function (next) {
    if(!this.isModified("password")) { // This is so that if a pass is hashed, it will not be hashed again.
        next()
    }
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

});




// Check if passwords are correct
usersSchema.methods.checkPassword = async function(passFormulario){
    
    return await bcrypt.compare(passFormulario, this.password)
}



const Users = mongoose.model('Users', usersSchema)

export default Users