const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT=3000;

dotenv.config({path:'./config.env'});

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

//middleware

// we link the router files to make our route easy
app.use(require('./router/auth'));

const middleware = (req,res,next) => {
    console.log('Hello my middleware');
    next(); 
}

app.get('/', (req,res) => {
    res.send('Hello Google appjs');
});

app.get('/about', middleware, (req,res) => {
    console.log("Hello my about");
    res.send('About Google');
});

app.get('/contact', (req,res) => {
    res.send('Contact Google');
});

app.get('/signin', (req,res) => {
    res.send('Sign In');
});

app.get('/signup', (req,res) => {
    res.send('Sign  Up');
});

app.listen(PORT, ()=> {
    console.log(`server is running at port no. ${PORT}`);
})