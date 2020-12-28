const bcrypt = require("bcrypt");
const express = require('express');
const users = express.Router();
const User = require("../models/users.js");

let renderUser = (req, res) => {
    res.render("users/new.ejs", {
        userExists: userExists,
        user: userBefore,
        currentUser: req.session.currentUser,
        match: passwordMatch,
        tooShort: passwordTooShort,
        invalidUser: invalidUser
    });
}

//New sign up page

let passwordMatch;
let userBefore;
let userExists;
let passwordTooShort;
let invalidUser;

users.get("/new", (req, res) => {
    passwordMatch = true;
    userBefore = req.body.username;
    userExists = false;
    passwordTooShort = false;
    invalidUser = false;
    renderUser(req, res);
})

// Validation function
function invalidName(str) {
    let symbolTest = (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str));
    let capsTest = (/[A-Z]/.test(str));
    return symbolTest || capsTest;
}

users.post("/", (req, res) => {

    // Username validation
    if (invalidName(req.body.username)) {
        invalidUser = true;
        passwordTooShort = false;
        userBefore = "";
        passwordMatch = true;
        userExists = false;
        renderUser(req, res);
    } else if (req.body.password.length < 4) { //Password length
        passwordTooShort = true;
        userBefore = req.body.username;
        passwordMatch = true;
        userExists = false;
        invalidUser = false;
        renderUser(req, res);

    } else if (req.body.password === req.body.confirmPassword) { //Check password match

        passwordMatch = true;
        passwordTooShort = false;
        invalidUser = false;
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, createdUser) => {
            console.log("User is created: " + createdUser);
            if (createdUser === undefined) { //User exists
                userExists = true
                userBefore = "";
                invalidUser = false;
                renderUser(req, res);
            } else { //Success
                userCreated = true;
                res.redirect("/");
            }
        })

    } else { // Passwords dont match

        passwordTooShort = false;
        userBefore = req.body.username;
        passwordMatch = false;
        userExists = false;
        invalidUser = false;
        renderUser(req, res);
    }
})

module.exports = users;