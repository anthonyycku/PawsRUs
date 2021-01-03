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

//FAVORITES

router.get("/favorites", isAuthenticated, (req, res) => {
    latestPage = "/main/favorites";
    if (req.session.currentUser) {
        let result = [];
        let currentUsername = req.session.currentUser.username;

        Paws.find({}, (err, found) => {
            for (let pet of found) {
                if (pet.favoritedBy) {
                    if (pet.favoritedBy.includes(currentUsername)) {
                        result.push(pet);
                    }
                }
            }
        })
        setTimeout(function() {
            res.render("main/favorite.ejs", {
                currentUser: req.session.currentUser,
                data: result,
                dataLength: result.length
            })
        }, 300)
    }
});

router.get("/favorites/:id", isAuthenticated, (req, res) => {
    let currentUsername = req.session.currentUser.username;

    Paws.findById(req.params.id, (err, found) => {
        if (!found.favoritedBy.includes(currentUsername)) {
            found.favoritedBy.push(currentUsername);
            found.save();
        } else {
            let userIndex = found.favoritedBy.indexOf(currentUsername);
            found.favoritedBy.splice(userIndex, 1);
            found.save();
        }
    })
    setTimeout(function() {
        res.redirect("/main/" + userPage);
    }, 200)
});

router.get("/favorites2/:id", isAuthenticated, (req, res) => {
    let currentUsername = req.session.currentUser.username;

    Paws.findById(req.params.id, (err, found) => {
        if (!found.favoritedBy.includes(currentUsername)) {
            found.favoritedBy.push(currentUsername);
            found.save();
        } else {
            let userIndex = found.favoritedBy.indexOf(currentUsername);
            found.favoritedBy.splice(userIndex, 1);
            found.save();
        }
    })
    setTimeout(function() {
        res.redirect("/main/favorites");
    }, 200)
});



// NEW
router.get('/new', isAuthenticated, (req, res) => {
    res.render('main/new.ejs', {
        currentUser: req.session.currentUser
    })
})

router.post('/new', parser.single("image"), (req, res) => {
    let result = req.body;

    result.favoritedBy = [];

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
                justCreated = true;
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
            justEdited = true;
            res.redirect('/main/show/' + req.params.id)
        }
    )
})

// DELETE
router.delete('/show/:id', (req, res) => {
    Paws.findByIdAndRemove(req.params.id, (err, deletedPet) => {
        justDeleted = true;
        res.redirect('/main/' + userPage)
    })
})

// SHOW
router.get('/show/:id', (req, res) => {
    setTimeout(function() {
        justEdited = false;
    }, 250);
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/show.ejs', {
            pet: foundPet,
            currentUser: req.session.currentUser,
            latestPage: latestPage
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
                description: "Great doggo from downtown",
                favoritedBy: []
            }, {
                name: "Big daddy",
                age: "1yr 5mo",
                breed: "Spitz",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample2_tilhee.jpg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: true,
                description: "Most handsome dog in chinatown",
                favoritedBy: []
            }, {
                name: "Polo",
                age: "10yr",
                breed: "Klee Kai",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609579864/paws/wq2vlji69xpv0sbnmnaf.jpg",
                goodWithCats: true,
                goodWithKids: false,
                goodWithDogs: false,
                description: "Absolutely hates kids",
                favoritedBy: []
            }, {
                name: "Not Polo",
                age: "10yr",
                breed: "CORGI??",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609360932/paws/ub7woh8lxykdijj2xnns.jpg",
                goodWithCats: true,
                goodWithKids: false,
                goodWithDogs: false,
                description: "Is he disguised?",
                favoritedBy: []
            }, {
                name: "Froggo",
                age: "Who cares?",
                breed: "Drog",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample4_ennrra.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: true,
                description: "Don't know if this guy is a frog or a cow",
                favoritedBy: []
            }, {
                name: "Slim Jim",
                age: "13yr",
                breed: "Longneckboy",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306061/paws/sample5_lljpt6.jpg",
                goodWithCats: false,
                goodWithKids: false,
                goodWithDogs: false,
                description: "His tongue can whip you senseless",
                favoritedBy: []
            }, {
                name: "Tubs",
                age: "3yr",
                breed: "SleepyBoy",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample6_axhlhg.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Sleeps all day and will eat your foot",
                favoritedBy: []
            }, {
                name: "Nemo",
                age: "4yr 1mo",
                breed: "Catman",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609457423/paws/ec8y12ahu9m1og8j5n99.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "This is a cat, not a dog!",
                favoritedBy: []
            }, {
                name: "Meeeeeeep",
                age: "6mo",
                breed: "Shiba",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609361060/paws/y4gfkog5kc4xwjns1jvg.jpg",
                goodWithCats: true,
                goodWithKids: true,
                goodWithDogs: false,
                description: "This guy stretches.",
                favoritedBy: []
            }, {
                name: "Puppers",
                age: "2mo",
                breed: "Mixed",
                image: "https://res.cloudinary.com/dhzjnizig/image/upload/v1609306060/paws/sample3_agvf1f.jpg",
                goodWithCats: false,
                goodWithKids: true,
                goodWithDogs: false,
                description: "Cutest little puppers that's not a frog",
                favoritedBy: []
            }, ], (error, data) => {

            })
        }
        setTimeout(function() {
            justCreated = true;
            res.redirect("/main/" + userPage)
        }, 300)
    })

})

// NUKE ROUTE
router.delete("/setup/nuke", isAuthenticated, (req, res) => {
    Paws.deleteMany({}, (err, deleted) => {
        justDeleted = true;
        res.redirect("/");
    })
})

// ABOUT 
router.get("/about", (req, res) => {
    res.render("main/about.ejs", {
        currentUser: req.session.currentUser
    })
})



// INDEX
router.get('/:page', (req, res) => {
    const perPage = 8;
    const page = req.params.page || 1;
    let numberOfProfiles = 0;

    Paws.find({}, (err, data) => {
        numberOfProfiles = data.length;
    })

    Paws.find({}, (err, found) => {
            userPage = page;
            latestPage = "/main/" + page;
            setTimeout(function() {
                userCreated = false;
                justDeleted = false;
                justCreated = false;
            }, 500);
            setTimeout((function() {
                res.render('main/index.ejs', {
                    data: found,
                    currentUser: req.session.currentUser,
                    currentPage: parseInt(page),
                    pages: Math.ceil(numberOfProfiles / perPage),
                    results: numberOfProfiles,
                    userCreated: userCreated,
                    toggleAccordion: toggleAccordion
                })
            }), 250);
        })
        .skip((perPage * page) - (perPage))
        .limit(perPage);

})


module.exports = router;