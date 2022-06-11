import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cat: {
        type: String,
        required: true
    },

    content: [

        {
        
            name: {  
                 type: String,
                required: true
            
            },
            
            description: {
                type: String,
            },

            reputation: {
                type: Number,
            },

            tendencia: {
                type: Boolean,
            
            },
            
            img:{ 
            type: String,
            required: true
            },
            
        }
    
    ]
},


    {
        timestamps : true, 
    }
    
)



const Movies = mongoose.model('movies-netflix', moviesSchema)



export default Movies;
