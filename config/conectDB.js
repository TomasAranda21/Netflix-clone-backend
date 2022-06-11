import mongoose from 'mongoose';

const conectDB = async () => {

    try {
        await mongoose.connect(
            process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        
    } catch (error) {
        
        console.log(error)
        process.exit(1)

    }
}

export default conectDB