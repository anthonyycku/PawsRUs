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
router.get('/', (req, res) => {
    Paws.find({}, (error, allPets) => {
        res.render('main/index.ejs', {
            data: allPets,
            currentUser: req.session.currentUser
        })
    })
})


// NEW
router.get('/new', (req, res) => {
    res.render(
        'main/new.ejs', { currentUser: req.session.currentUser }
    )
})

router.post('/', isAuthenticated, (req, res) => {
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
    Paws.create({},
        (error, data) => {
            res.redirect('/main')
        }
    )
})

// NUKE ROUTE
router.put("/setup/nuke", isAuthenticated, (req, res) => {
    Paws.deleteMany({}, (err, deleted) => {
        res.redirect("/");
    })
})

module.exports = router;