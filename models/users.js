

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    // phoneNumber: {type: Number, required: true},
})

module.exports = mongoose.model('User', UserSchema)