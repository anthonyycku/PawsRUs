const express = require('express')
const Fruit = require('../models/fruits.js')
const fruits = express.Router()

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect("/sessions/new");
    }
}

// NEW
fruits.get('/new', (req, res) => {
    res.render(
        'fruits/new.ejs', { currentUser: req.session.currentUser }
    )
})

// EDIT
fruits.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('fruits/edit.ejs', {
            fruit: foundFruit,
            currentUser: req.session.currentUser
        })
    })
})

// DELETE
fruits.delete('/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
        res.redirect('/fruits')
    })
})

// SHOW
fruits.get('/:id', isAuthenticated, (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('fruits/show.ejs', {
            fruit: foundFruit,
            currentUser: req.session.currentUser
        })
    })
})

// UPDATE
fruits.put('/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Fruit.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true },
        (error, updatedModel) => {
            res.redirect('/fruits')
        }
    )
})

// CREATE
fruits.post('/', isAuthenticated, (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits')
    })
})

// INDEX
fruits.get('/', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('fruits/index.ejs', {
            fruits: allFruits,
            currentUser: req.session.currentUser
        })
    })
})

// SEED ROUTE
fruits.get('/setup/seed', isAuthenticated, (req, res) => {
    Fruit.create(
        [{
                name: 'grapefruit',
                color: 'pink',
                readyToEat: true
            },
            {
                name: 'grape',
                color: 'purple',
                readyToEat: false
            },
            {
                name: 'avocado',
                color: 'green',
                readyToEat: true
            }
        ],
        (error, data) => {
            res.redirect('/fruits')
        }
    )
})

// Drop DB Route
fruits.get(
    '/dropdatabase/cannotundo/areyoursure/reallysure/okthen',
    (req, res) => {
        Fruit.collection.drop()
        res.send('You did it! You dropped the database!')
    }
)

module.exports = fruits