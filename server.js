// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require("express-session");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();



// CONFIGURATION

const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODBURI;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MIDDLEWARE
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: false
}));



// DATABASE
mongoose.connect(
    mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    () => {
        console.log('the connection with mongod is established at', mongodbURI)
    }
);

// Optional, but likely helpful
// Connection Error/Success
// Define callback functions for various events
db.on('error', err => console.log(err.message + ' is mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Controllers
const mainController = require('./controllers/main_controller.js');
const userController = require("./controllers/users_controller.js");
const sessionsController = require("./controllers/sessions_controller.js");
app.use('/main', mainController);
app.use("/users", userController);
app.use("/sessions", sessionsController);
global.userCreated = false;
global.maxProfiles = 40;



// Routes
app.get('/', (req, res) => {
    res.redirect('/main/1')
});

// Listener
app.listen(PORT, () => {
    console.log('🍒🍋Listening on port🥝🍉', PORT)
});