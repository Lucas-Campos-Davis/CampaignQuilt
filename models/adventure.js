const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startLevel:{
        type: Number,
        required: true
    },
    endLevel:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Adventure', adventureSchema);