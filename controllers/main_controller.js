const express = require('express')
const Paws = require('../models/pets.js')
const router = express.Router()

//AUTHENTICATE
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect("/sessions/new");
    }
};

//////////////////////////////////
//             ROUTES           //
//////////////////////////////////


// NEW
router.get('/new', isAuthenticated, (req, res) => {
    res.render('main/new.ejs', {
        currentUser: req.session.currentUser
    })
})

router.post('/new', (req, res) => {
    let result = req.body;

    if (result.image === "") {
        result.image = "na.jpeg";
    }
    if (result.goodWithKids === "on") {
        result.goodWithKids = true;
    } else {
        result.goodWithKids = false;
    }
    if (result.goodWithDogs === "on") {
        result.goodWithDogs = true;
    } else {
        result.goodWithDogs = false;
    }
    if (result.goodWithCats === "on") {
        result.goodWithCats = true;
    } else {
        result.goodWithCats = false;
    }
    Paws.countDocuments({}, (err, count) => {
        if (count < maxProfiles) {
            Paws.create(req.body, (error, createdPet) => {
                res.redirect('/')
            })
        } else {
            res.redirect("/");
        }
    })

})

// EDIT
router.get('/edit/:id', isAuthenticated, (req, res) => {
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/edit.ejs', {
            data: foundPet,
            currentUser: req.session.currentUser
        })
    })
})

router.put('/edit/:id', isAuthenticated, (req, res) => {
    Paws.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (error, updatedModel) => {
            res.redirect('/main')
        }
    )
})

// DELETE
router.delete('/show/:id', (req, res) => {
    Paws.findByIdAndRemove(req.params.id, (err, deletedPet) => {
        res.redirect('/main')
    })
})

// SHOW
router.get('/show/:id', (req, res) => {
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/show.ejs', {
            data: foundPet,
            currentUser: req.session.currentUser
        })
    })
})

// SEED ROUTE
router.get('/setup/seed', isAuthenticated, (req, res) => {

    Paws.countDocuments({}, (err, count) => {

        if (count < (maxProfiles - 4)) {
            Paws.insertMany([{
                name: "Al Gore",
                age: "1yr 2mo",
                breed: "Something",
                image: "sample1.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Great doggo from downtown"
            }, {
                name: "handsomeboy",
                age: "1yr 5mo",
                breed: "snowman",
                image: "sample2.jpg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Most handsome dog in chinatown"
            }, {
                name: "puppy",
                age: "2mo",
                breed: "Mixed",
                image: "sampl3.jpeg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Cutest little puppers that's not a frog"
            }, {
                name: "Froggo",
                age: "Unknown",
                breed: "frogman",
                image: "sample4.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: true,
                description: "Don't know if this guy is a frog or a cow"
            }, {
                name: "Slim Jim",
                age: "13yr",
                breed: "Longneckboy",
                image: "sample5.jpg",
                goodWithCats: false,
                goodWithKids: false,
                goodWithDogs: false,
                description: "His tongue can whip you senseless"
            }, {
                name: "Tubs",
                age: "3yr",
                breed: "SleepyBoy",
                image: "sample6.jpeg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Sleeps all day and will eat your pasta"
            }], (error, data) => {

            })
        }
        res.redirect("/");
    })

})

// NUKE ROUTE
router.delete("/setup/nuke", isAuthenticated, (req, res) => {
    Paws.deleteMany({}, (err, deleted) => {
        res.redirect("/");
    })
})

// INDEX
router.get('/:page', (req, res) => {
    const perPage = 4;
    const page = req.params.page || 1;
    let numberOfProfiles = 0;

    Paws.find({}, (err, data) => {
        numberOfProfiles = data.length;
    })

    Paws.find({}, (err, found) => {
            setTimeout(function() {
                userCreated = false;
            }, 150);
            setTimeout((function() {
                res.render('main/index.ejs', {
                    data: found,
                    currentUser: req.session.currentUser,
                    currentPage: parseInt(page),
                    pages: Math.ceil(numberOfProfiles / perPage),
                    results: numberOfProfiles,
                    userCreated: userCreated
                })
            }), 100);
        })
        .skip((perPage * page) - (perPage))
        .limit(perPage);
})

module.exports = router;