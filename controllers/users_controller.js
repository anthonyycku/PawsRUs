const bcrypt = require("bcrypt");
const express = require('express');
const users = express.Router();
const User = require("../models/users.js");

//New sign up page

let passwordMatch;
let userBefore;
let userExists;
let passwordTooShort;

users.get("/new", (req, res) => {
    passwordMatch = true;
    userBefore = req.body.username;
    userExists = false;
    passwordTooShort = false;

    res.render("users/new.ejs", {
        userExists: userExists,
        user: userBefore,
        currentUser: req.session.currentUser,
        match: passwordMatch,
        tooShort: passwordTooShort
    });
})

users.post("/", (req, res) => {
    if (req.body.password.length < 4) {
        passwordTooShort = true;
        userBefore = req.body.username;
        passwordMatch = true;
        res.render("users/new.ejs", {
            userExists: userExists,
            user: userBefore,
            currentUser: req.session.currentUser,
            match: passwordMatch,
            tooShort: passwordTooShort
        });
    } else if (req.body.password === req.body.confirmPassword) {

        passwordMatch = true;
        passwordTooShort = false;
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, createdUser) => {
            console.log("User is created: " + createdUser);
            if (createdUser === undefined) {
                userExists = true;
                res.render("users/new.ejs", {
                    userExists: userExists,
                    user: userBefore,
                    currentUser: req.session.currentUser,
                    match: passwordMatch,
                    tooShort: passwordTooShort
                });
            } else {
                userCreated = true;
                res.redirect("/");
            }
        })

    } else {
        passwordTooShort = false;
        userBefore = req.body.username;
        passwordMatch = false;
        userExists = false;
        res.render("users/new.ejs", {
            userExists: userExists,
            user: userBefore,
            currentUser: req.session.currentUser,
            match: passwordMatch,
            tooShort: passwordTooShort
        });
    }
})

module.exports = users;