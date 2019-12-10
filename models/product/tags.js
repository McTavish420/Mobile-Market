const mongoose = require('mongoose');

let TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 20
    }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = {Tag};