const express = require('express');
const _ = require('lodash');
const { Product } = require('../models/product/product');
const { ObjectID } = require('mongodb');

const router = express.Router();

// create a product
router.post('/create', (req, res) => {
    console.log(req.body)
    let body = _.pick(req.body, ['name', 'price', 'tags', 'category', 'imgUrl', 'details', 'discount', 'hot']);
    let product = new Product(body);
    product.save().then((doc) => {
        console.log(`Successfully added to database and ${doc}`);

        res.send(`Successfully added to database and ${doc}`);
    }).catch((e) => {
        console.log('Fail to add the product!');
        res.status(400).send(e);
    });
});

// get all product

router.get('/', (req, res) => {
    Product.find().then((docs) => {
        res.send(JSON.stringify(docs));
    }, (err) => {
        res.status(400).send(err);
    });
});

// get a product 
router.get('/:id', (req, res) => {
    console.log(req.params);
    
    let id = req.params.id;
    console.log(id);
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Product.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send()
        }
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
});

// Delete a product

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Product.findByIdAndRemove(id).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// Update a product

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;
    
    Product.findByIdAndUpdate(id, {$set: updateObject}).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});







module.exports = router;