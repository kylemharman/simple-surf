const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') // removes "Bearer from Auth Header"
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // find user id with this token stored in thier tokens array

        if (!user) {
            throw new Error()
        }

        req.token = token // adds the current users token to the request 
        req.user = user // adds the current user to the request 
        next()

    } catch (e) {
        res.status(401).send({ error: "Please login to see this content."})
    }

}

module.exports = auth