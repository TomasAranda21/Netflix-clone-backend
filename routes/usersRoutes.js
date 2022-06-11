import express from 'express';
import checkAuth from '../middleware/authMidleware.js';

import {
    registerUsers, 
    authenticateUsers,
    getUser,
    editUser,
    changePassword,
    confirmUser,
    authenticateAuto,
    changeEmail,
    checkToken,
    forgotPassword,
    checkTokenPass,
    newPassword,
    changeEmailCompleted
   
} from '../controllers/usersController.js';

import { addProfile,  getProfile, updateProfile, } from '../controllers/profileController.js';

import {films, addToMyList, deleteMovieFromList, getMoviesList } from '../controllers/moviesController.js';



const router = express.Router()

router.post('/registration', registerUsers);

router.post('/login', authenticateUsers);

router.post('/login-auto', authenticateAuto);

router.get('/confirmed/:token', confirmUser) 


// Forgot password
router.post('/loginHelp', forgotPassword)

router.route('/loginHelp/:token')
.get(checkTokenPass)
.post(newPassword)




// Protected routes
router.get('/users', checkAuth, getUser)

router.route('/users/:id')
.put(checkAuth, editUser)


router.route('/users/change-password/:id')
.put(checkAuth, changePassword)



router.post('/users/change-email',checkAuth,changeEmail)
router.route('/users/change-email/:token')
.get(checkToken)
.post(changeEmailCompleted)





router.get('/view-movies',checkAuth, films)
router.route('/my-list/:id')
.get(checkAuth, getMoviesList)
.post(checkAuth, addToMyList)
.delete(checkAuth, deleteMovieFromList)




// All of the user's profile
router.route('/profile/:id')
.post(checkAuth, addProfile)
.get(checkAuth, getProfile)
.put(checkAuth, updateProfile)




export default router

