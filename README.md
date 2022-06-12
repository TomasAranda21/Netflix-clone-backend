
# Netflix Clone Backend


## 🚀 About this proyect
Hello👋, I want to present you an application that I made with react, tailwind, nodejs and express. It's a clone of Netflix, the application is in Spanish, I regret having made it in Spanish, but that's how I started it and it was too late to change it to English.

The images and the name of the movies are taken from Netflix itself so that it has a little more "realism". I didn't like movie APIs so I decided to make my own API.
What could be added is a description of the movies, but I'll leave that for later with the possible improvements I make.



**The technologies used 🛠:**

 `Nodejs`
 `Express`
 `Express-fileupload`
 `jsonwebtoken`
 `nodemailer`
 `cloudinary`
 `bcrypt`
 `cors`
 `jwt-decode`
 `uuid`


----- **The features it has are:** -----
-	Access
-	Check in
-	Recover password
-   The ability to log in without an account

----- **The functionalities that you have within the account are:** -----
- Being able to add movies to "My list"
- Create a profile like Netflix has
- Being able to add, edit the photo and name of your profile
- In your account you can change the email, and the password




## Project WebSite: https://netflix-clone-ta.netlify.app

## Usage

To deploy this project run

```bash
  npm run dev
```

## Installation

Install my-project with npm

```bash
    npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.


#### These variables are for the database for the frontend url and for the json web token

`MONGO_URI`

`FRONTEND_URL`

`JWT_SECRET`

###

#### These variables are for sending emails

`EMAIL_USER`

`EMAIL_PASS`

`EMAIL_HOST`

`EMAIL_PORT`

###

#### These variables are for cloudinary

`CLOUD_NAME`

`API_KEY`

`API_SECRET`

###



## Screenshots

![App Screenshot](https://res.cloudinary.com/dkxm9njd6/image/upload/v1655065986/login_register-gif_vnh2uv.gif)

#

![App Screenshot](https://res.cloudinary.com/dkxm9njd6/image/upload/v1655065985/cambiar_email_pass-gif_pjbgxl.gif)

#

![App Screenshot](https://res.cloudinary.com/dkxm9njd6/image/upload/v1655065985/telefono-gif_dsuhfs.gif)



## Possible fixes and improvements 🔧💡:

- Improve the carousel so that it is tactile on mobile devices, for this we must take into account that the user cannot scroll infinitely.
- Add description to movies.
- Functionality can be added when choosing an account, such as premium, basic or standard and this is reflected in each user's profile.
- Add registration with Google for faster login.
- Refactor the css code, which is perhaps the most complicated to read.
- Add search functionality to each page since for now only the main page has it.
- Change the entire site to the English language.
