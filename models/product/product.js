// importing package depndecies
const mongoose = require('mongoose');
const _ = require('lodash');

let ProductScema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        trim: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    details: {
        type: String,
        trim: true
    },
    discount: {
        type: Number,
        default: 0
    },
    hot: {
        type: Boolean,
        default: false
    }
});

// custom instance methods 


// custom statics methods


// custom middlewares



const Product = mongoose.model('Product', ProductScema);

module.exports = { Product };