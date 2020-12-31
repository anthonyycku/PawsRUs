const express = require('express')
const Paws = require('../models/pets.js')
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//Cloud storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'paws'
    },
});
const parser = multer({ storage: storage });

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

router.post('/new', parser.single("image"), (req, res) => {
    let result = req.body;

    if (!req.file) {
        result.image = "/images/sample/na.jpeg";
    } else {
        result.image = req.file.path;
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
        defaultImage = foundPet.image;
        res.render('main/edit.ejs', {
            pet: foundPet,
            currentUser: req.session.currentUser
        })
    })
})

router.put('/edit/:id', parser.single("image"), isAuthenticated, (req, res) => {
    let result = req.body;

    if (!req.file) {
        result.image = defaultImage;
    } else {
        result.image = req.file.path;
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
    Paws.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (error, updatedModel) => {
            res.redirect('/main/show/' + req.params.id)
        }
    )
})

// DELETE
router.delete('/show/:id', (req, res) => {
    Paws.findByIdAndRemove(req.params.id, (err, deletedPet) => {
        res.redirect('/main/' + userPage)
    })
})

// SHOW
router.get('/show/:id', (req, res) => {
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/show.ejs', {
            pet: foundPet,
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
                breed: "Rhodesian ridgeback",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306061/paws/sample1_mnwkiz.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Great doggo from downtown"
            }, {
                name: "Big daddy",
                age: "1yr 5mo",
                breed: "Spitz",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample2_tilhee.jpg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Most handsome dog in chinatown"
            }, {
                name: "puppy",
                age: "2mo",
                breed: "Mixed",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample3_agvf1f.jpg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Cutest little puppers that's not a frog"
            }, {
                name: "Froggo",
                age: "Who cares?",
                breed: "Drog",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample4_ennrra.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: true,
                description: "Don't know if this guy is a frog or a cow"
            }, {
                name: "Slim Jim",
                age: "13yr",
                breed: "Longneckboy",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306061/paws/sample5_lljpt6.jpg",
                goodWithCats: false,
                goodWithKids: false,
                goodWithDogs: false,
                description: "His tongue can whip you senseless"
            }, {
                name: "Tubs",
                age: "3yr",
                breed: "SleepyBoy",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample6_axhlhg.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Sleeps all day and will eat your foot"
            }], (error, data) => {

            })
        }
        setTimeout(function() {
            res.redirect("/main/" + userPage)
        }, 300)
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
            userPage = page;
            setTimeout(function() {
                userCreated = false;
            }, 500);
            setTimeout((function() {
                res.render('main/index.ejs', {
                    data: found,
                    currentUser: req.session.currentUser,
                    currentPage: parseInt(page),
                    pages: Math.ceil(numberOfProfiles / perPage),
                    results: numberOfProfiles,
                    userCreated: userCreated
                })
            }), 250);
        })
        .skip((perPage * page) - (perPage))
        .limit(perPage);
})

module.exports = router;