const bcrypt = require("bcrypt");
const express = require('express');
const users = express.Router();
const User = require("../models/users.js");

//New sign up page

let passwordMatch;
let userBefore;
let userExists;
users.get("/new", (req, res) => {
    passwordMatch = true;
    userBefore = req.body.username;
    userExists = false;
    res.render("users/new.ejs", {
        userExists: userExists,
        user: userBefore,
        currentUser: req.session.currentUser,
        match: passwordMatch
    });
})

users.post("/", (req, res) => {

    if (req.body.password === req.body.confirmPassword) {


        passwordMatch = true;
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, createdUser) => {
            console.log("User is created: " + createdUser);
            if (createdUser === undefined) {
                userExists = true;
                res.render("users/new.ejs", {
                    userExists: userExists,
                    user: userBefore,
                    currentUser: req.session.currentUser,
                    match: passwordMatch
                });
            } else {
                res.redirect("/");
            }
        })
    } else {
        userBefore = req.body.username;
        passwordMatch = false;
        userExists = false;
        res.render("users/new.ejs", {
            userExists: userExists,
            user: userBefore,
            currentUser: req.session.currentUser,
            match: passwordMatch
        });
    }
})

module.exports = users;