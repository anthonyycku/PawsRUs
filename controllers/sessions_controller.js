const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

let renderLogin = (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser,
        usernameExists: usernameExists,
        passwordMatch: passwordMatch
    })
}

// Login page
let usernameExists;
let passwordMatch;

sessions.get("/new", (req, res) => {
    usernameExists = true;
    passwordMatch = true;
    renderLogin(req, res);
})

sessions.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send("Oops DB has a problem");
            // Username does not exist
        } else if (!foundUser) {
            usernameExists = false;
            passwordMatch = true;
            renderLogin(req, res);
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/");

            } else { // Password does not match
                passwordMatch = false;
                usernameExists = true;
                renderLogin(req, res);
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})

module.exports = sessions;