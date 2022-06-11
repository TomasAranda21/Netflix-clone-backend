import mongoose from "mongoose";

const profileSchema = mongoose.Schema({

    img:{
        url: String,
        public_id: String,
        required: false

    } ,

    profile_name: {

        type: String,
        required: true,
        trim: true 
    },

    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'

    },
},

    {
        timestamps : true,
    }

)

const Profile = mongoose.model('ProfileUsers', profileSchema)



export default Profile;
