const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 25
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {Category};