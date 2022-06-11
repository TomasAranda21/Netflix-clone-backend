import mongoose from "mongoose";

const MyListSchema = mongoose.Schema({

    name: {
        type: String,

    },

    img:{
        type: String,
    },

    reputation: {
        type: Number,
    },

    description:{
        type: String,

    },

    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'

    }

},
    {
        timestamps : true,
    }
)


const MyList = mongoose.model('MyList', MyListSchema)

export default MyList
