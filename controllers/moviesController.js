
import Movies from '../models/modelMovies.js'
import MyList from '../models/modelMyList.js'



const films = async (req, res) => {

    const movies = await Movies.find()

    res.json(movies)

}



const addToMyList = async (req, res) => {

    const {name} = req.body

    
    const movieExists = await MyList.findOne({name})
    
    if(movieExists){

        if(movieExists.users._id.toString() === req.users._id.toString()) {

            const error = new Error('Ya fué agregada');

            return res.status(403).json({msg: error.message})
    
        }
    }


        const list =  new MyList(req.body);
        list.users = req.users._id

    try {

        const movieToList = await list.save();

        res.json(movieToList)

    } catch (error) {
        console.log(error)
    }
}











const getMoviesList = async (req, res) => {


    const moviesList = await MyList.find().where('users').equals(req.users)

    
    if(!moviesList){
        const error = new Error('No existe un perfil')
        return res.status(400).json({msg: error.message})

    }

    res.json(moviesList)

}



const deleteMovieFromList = async (req, res) => {

    const {id} = req.params

    const arr = id.split('.')

    const _id = arr[1]

    const name = arr[0]


    const movieExists = await MyList.findOne({name})

    if(movieExists){

        if(movieExists.users._id.toString() === _id) {

            try {
                
                const deleteMovie = await movieExists.deleteOne()
            
                res.json(deleteMovie)

            } catch (error) {

                console.log(error)
            }
    
        }
    }
}

export{
    films,
    addToMyList,
    deleteMovieFromList,
    getMoviesList,
}