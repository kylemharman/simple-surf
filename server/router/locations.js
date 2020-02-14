const express = require("express");
const router = new express.Router();
const Location = require('../models/locations');
const auth = require('../middleware/auth')

router.post('/locations', async (req, res) => {

    const location = new Location(req.body) // get the request body from the incoming json object

    try {
        await location.save()
        res.status(201).send({ location }) // 201 staus code = Created 
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all locations
router.get('/locations', async (req, res) => {

    try {
        const locations = await Location.find().collation({locale:'en',strength: 2}).sort({name:1})
        res.send(locations)
    } catch (e) {
        res.status(500).send(e)
    }

})

// get locations based on search
router.get('/location-search/:locations', async (req, res) => {

    const locationsGroup = req.params.locations

    console.log(locationsGroup)

    try {
        const locations = await Location.find( {"country_group" : locationsGroup }).collation({locale:'en',strength: 2}).sort({name:1})
        console.log(locations)
        res.send(locations)
    } catch (e) {
        res.status(500).send(e)
    }

})
// get a location by id
router.get('/locations/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const location = await Location.findById(_id)
        
        if (!location) {
            return res.status(404).send()
        }
        res.send(location)
    } catch (e) {
        res.status(500).send(e)
    }

})


module.exports = router;