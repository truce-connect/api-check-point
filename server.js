

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
require('dotenv').config();

const app = express();
const PORT = 8000;

//Mongodb Connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB not Connected", err));


app.use(express.json());

//GET: RETURN ALL USERS
app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (err) {
        res.status(500).json({error: "Server error"})
    }
});

//POST
app.post('/users', async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser)
    } catch (err) {
        res.status(500).json({error: "Internal server error"})
    }
});

//PUT
app.put('/users/:id', async(req, res) => {
    try {
        const updateUser = await User.findUserByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateUser) 
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
});

//DELETE
app.delete('/users/:id', async(req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json(deleteUser)
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

//LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});