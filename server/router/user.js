const express = require("express");
const router = new express.Router(); // creates a new router instance
const User = require('../models/user');
const auth = require('../middleware/auth');

// create a new user
router.post('/sign-up', async (req, res) => {

    const user = new User(req.body) // get the request body from the incoming json object

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token }) // 201 staus code = Created 
    } catch (e) {
        res.status(400).send(e)
    }
})

// login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({error: 'Invalid login details!'})
    }
})

// logout user
router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send()
    }
})
// logout user out of all sessions
router.post('/logout-all-sessions', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save()
        
        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

// add a favorite spot
router.post('/user/favorites', auth, async (req, res) => {
    
    const location = { locationID: req.body.locationID, name: req.body.name }

    try {
        req.user.favorites = req.user.favorites.concat( location )
        await req.user.save();
        res.send(req.user) // 201 staus code = Created 
    } catch (e) {
        res.status(400).send(e)
    }
})

// remove a favorite spot
router.post('/user/favorites/:id', auth, async (req, res) => {

    try {
        req.user.favorites = req.user.favorites.filter(location => {
            return location.locationID !== req.params.id
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
    
// get the user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// update user profile 
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidUpdate = updates.every( update => allowedUpdates.includes(update)) // has to return true for everycase

    if(!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update fields!'})
    }
    
    try {
        updates.forEach( update => req.user[update] = req.body[update])
        await req.user.save()

        res.status(202).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// delete user profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router;