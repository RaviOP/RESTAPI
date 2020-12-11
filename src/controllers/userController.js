const User = require('../models/User')

let createUser = async (req, res) => {
    try {
        const { name, email, phone, dateOfBirth, password } = req.body
        const user = new User({ name, email, phone, dateOfBirth, password })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201)
        res.send({ user, token })
    } catch (error) {
        res.status(400)
        res.send({ Error: error.message })
    }
}

let readUser = (req, res) => {
    res.send(req.user)
}

let updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'phone', 'dateOfBirth', 'password']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send({
                Error: 'Invalid Updates'
            })
        }
        const user = await User.findById(req.user._id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(500)
        res.send({ Error: error.message })
    }
}

let deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.remove()
        res.send(user)
    } catch (error) {
        res.status(500)
        res.send({Error: error.message})
    }
}

let loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400)
        res.send({Error: error.message})
    }
}

let logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('Successfully Logged Out')
    } catch (error) {
        res.status(500)
        res.send({Error: error.message})
    }
}

let logoutUserAllDevice = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('Successfully Logged Out From All Devices')
    } catch (error) {
        res.status(500)
        res.send({ Error: error.message })
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutUserAllDevice
}