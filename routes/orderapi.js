const express = require('express');
const _ = require('lodash');
const { Order } = require('../models/order');
const { ObjectID } = require('mongodb');
const {authenticate} = require('../middlewares/authentication');
const moment = require('moment');
const {sendMail} = require('../mailserver/mail');

const router = express.Router();

// create an order
router.post('/create',authenticate, (req, res) => {
    let user = req.user;
    let body = req.body;
    console.log('body', body)
    let item = {
        _id: body._id,
        name: body.name,
        price: body.price,
        quantity: body.quantity
    }
    console.log('item', item)
    let order = new Order()
    order.products.push(item)
    order.deliveryAddress = user.userAddress;
    order.bill = order.products[0].quantity * order.products[0].price
    order.orderFrom.userName = user.username;
    order.orderFrom.userAdress = user.userAddress;
    order.orderFrom.userEmail = user.email;
    order.orderFrom.userPhone = user.userPhone;
    order.createdAt = moment(moment().valueOf()).format('MMMM Do YYYY, h:mm:ss a');
    order.save().then((doc) => {
        console.log(doc);
        console.log('order created successfully!');
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
    
});
// get all orders of an user
router.get('/checked', authenticate, (req, res) => {
    let user = req.user;
    Order.findMyOrders(user).then((docs) => {
        res.send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// get all order

router.get('/', (req, res) => {
    Order.find({
        orderStatus: 'checked'
    }).then((docs) => {
        res.send(JSON.stringify(docs));
    }, (err) => {
        res.status(400).send(err);
    });
});

// Delete an order

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Order.findByIdAndRemove(id).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// Update a placed order

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;
    
    Order.findByIdAndUpdate(id, {$set: updateObject}).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});
// Update a unchecked order

router.patch('/:id/unchecked',authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;
    updateObject.createdAt = moment(moment().valueOf()).format('MMMM Do YYYY, h:mm:ss a');

    if (updateObject.orderStatus === 'checked') {
        Order.findByIdAndUpdate(id, { $set: updateObject }).then((info) => {
            if (!info) {
                return res.status(404).send();
            }
            console.log('checked order')
            // sendMail(info).then((res) => console.log('mail sent'));
            res.send(info);
        }).catch((e) => {
            res.status(400).send();
        });
    } else {
        Order.findByIdAndUpdate(id, { $set: updateObject }).then((info) => {
            if (!info) {
                return res.status(404).send();
            }
            res.send(info);
        }).catch((e) => {
            res.status(400).send();
        });
    }
});
// get all unchecked orders
router.get('/unchecked',authenticate, (req, res) => {
    let user = req.user;
    Order.findUnchecked(user).then((docs) => {
        res.send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
// get a certain order
router.get('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Order.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send()
        }
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
});









module.exports = router;