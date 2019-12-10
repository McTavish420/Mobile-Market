const express = require('express');
const _ = require('lodash');
const { Category } = require('../models/product/category');
const { ObjectID } = require('mongodb');

const router = express.Router();

// create a category
router.post('/create', (req, res) => {
    let body = req.body;
    let category = new Category(body);
    category.save().then((doc) => {
        console.log(doc);
        res.status(200).send(doc);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

// get all category

router.get('/', (req, res) => {
    Category.find().then((docs) => {
        res.send(JSON.stringify(docs));
    }, (err) => {
        res.status(400).send(err);
    });
});

// Delete a category

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Category.findByIdAndRemove(id).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// Update a category

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;
    
    Category.findByIdAndUpdate(id, {$set: updateObject}).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get a category
router.get('/:id', (req, res) => {
    console.log(req.params);

    let id = req.params.id;
    console.log(id);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Category.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send()
        }
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
});







module.exports = router;