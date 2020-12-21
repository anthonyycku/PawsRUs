const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");



sessions.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser
    })
})

sessions.post("/", (req, res) => {

    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send("Oops DB has a problem");
        } else if (!foundUser) {
            res.send("<a href='/'> Username does not exist </a>");
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/");
            } else {
                res.send("<a href='/'> Password does not match </a>");
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