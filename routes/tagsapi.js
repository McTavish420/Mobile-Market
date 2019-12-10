const express = require('express');
const _ = require('lodash');
const { Tag } = require('../models/product/tags');
const { ObjectID } = require('mongodb');

const router = express.Router();

// create a Tag
router.post('/create', (req, res) => {
    console.log(req.body)
    let body = req.body;
    let tag = new Tag(body);
    tag.save().then((doc) => {
        console.log(doc);
        res.status(200).send(doc);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

// get all Tags

router.get('/', (req, res) => {
    Tag.find().then((docs) => {
        res.send(JSON.stringify(docs));
    }, (err) => {
        res.status(400).send(err);
    });
});

// Delete a tag

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Tag.findByIdAndRemove(id).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// Update a tag

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;
    
    Tag.findByIdAndUpdate(id, {$set: updateObject}).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});
// get a tag
router.get('/:id', (req, res) => {
    console.log(req.params);

    let id = req.params.id;
    console.log(id);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Tag.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send()
        }
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
});







module.exports = router;