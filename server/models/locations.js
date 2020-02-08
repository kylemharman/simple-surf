const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    longitude: {
        type: String,
        trim: true,
        required: true
    },
    latitude: {
        type: String,
        trim: true,
        required: true
    }   
}, {
    timestamps: true
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;