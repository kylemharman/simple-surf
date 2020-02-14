const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    },
    country_group: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
    },
    region: {
        type: String,
        trim: true,
        required: true
    },
    best_swell: {
        type: String,
        trim: true,
        required: true
    },
    best_wind: {
        type: String,
        trim: true,
        required: true
    },
    swell_rating: {
        type: Object,
        trim: true
    },
    wind_rating: {
        type: Object,
        trim: true
    },
    // users: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {
    timestamps: true
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;