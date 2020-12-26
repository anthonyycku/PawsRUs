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

// INDEX
router.get('/:page', (req, res) => {

    const perPage = 4;
    const page = req.params.page || 1;
    let numberOfProfiles = 0;

    Paws.find({}, (err, data) => {
        numberOfProfiles = data.length;
    })

    Paws.find({}, (err, found) => {
            setTimeout((function() {
                res.render('main/index.ejs', {
                    data: found,
                    currentUser: req.session.currentUser,
                    currentPage: parseInt(page),
                    pages: Math.ceil(numberOfProfiles / perPage),
                    results: numberOfProfiles
                })
            }), 100);
        })
        .skip((perPage * page) - (perPage))
        .limit(perPage);

})


// NEW
router.get('/new', isAuthenticated, (req, res) => {
    res.render('main/new.ejs', {
        currentUser: req.session.currentUser
    })
})

router.post('/', (req, res) => {
    Paws.create(req.body, (error, createdPet) => {
        res.redirect('/main')
    })
})

// EDIT
router.get('/:id/edit', isAuthenticated, (req, res) => {
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/edit.ejs', {
            data: foundPet,
            currentUser: req.session.currentUser
        })
    })
})

router.put('/:id', isAuthenticated, (req, res) => {
    Paws.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (error, updatedModel) => {
            res.redirect('/main')
        }
    )
})

// DELETE
router.delete('/:id', (req, res) => {
    Paws.findByIdAndRemove(req.params.id, (err, deletedPet) => {
        res.redirect('/main')
    })
})

// SHOW
router.get('/:id', (req, res) => {
    Paws.findById(req.params.id, (error, foundPet) => {
        res.render('main/show.ejs', {
            data: foundPet,
            currentUser: req.session.currentUser
        })
    })
})

// SEED ROUTE
router.get('/setup/seed', isAuthenticated, (req, res) => {

    Paws.count({}, (err, count) => {

        if (count < 36) {
            Paws.insertMany([{
                name: "1",
                age: "1yr 2mo",
                breed: "golden retriever"
            }, {
                name: "2",
                age: "1yr 5mo",
                breed: "golden reliever"
            }, {
                name: "3",
                age: "6yr",
                breed: "Dachsund"
            }, {
                name: "4",
                age: "not born",
                breed: "frog"
            }, {
                name: "5",
                age: "13yr",
                breed: "gangster"
            }, {
                name: "6",
                age: "2mo",
                breed: "big dude"
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

module.exports = router;