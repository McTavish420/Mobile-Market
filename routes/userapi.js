const express = require('express');
const _ = require('lodash');
const {User} = require('../models/user');
const {authenticate} = require('../middlewares/authentication');
const { ObjectID } = require('mongodb');

const router = express.Router();

// create a user
router.post('/create', (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'username', 'userPhone', 'userAddress', 'role']);
    let user = new User(body);
    console.log(user)
    user.save().then(() => {
        console.log('passes through line 19')
        return user.generateAuthToken();
    }).then((token) => {
        console.log(`Sucessfully added user: `);
        console.log(user.username);
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log('Fail to add the user!');
        res.status(400).send(e);
    });
});

// logging in a user

router.post('/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            console.log(`${user.username} successfully logged in!`);
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// logging out an user 

router.delete('/logout', authenticate, (req, res) => {
    // console.log('line 50', req);
    // console.log('line 51' , req.user);
    
    req.user.removeToken(req.token).then(() => {
        console.log(`${req.user.username} is successfully logged out!`);
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// get a user
router.get('/:id', (req, res) => {
    console.log(req.params);

    let id = req.params.id;
    console.log(id);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send()
        }
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    });
});

// get all users
router.get('/', (req, res) => {
    User.find().then((docs) => {
        res.send(JSON.stringify(docs));
    }, (err) => {
        res.status(400).send(err);
    });
});

// update a userinfo
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    let updateObject = req.body;

    User.findByIdAndUpdate(id, { $set: updateObject }).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});

// delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndRemove(id).then((info) => {
        if (!info) {
            return res.status(404).send();
        }
        res.send(info);
    }).catch((e) => {
        res.status(400).send();
    });
});







module.exports = router;