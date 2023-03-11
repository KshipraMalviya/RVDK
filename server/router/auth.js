const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req,res) => {
    res.send('Hello Google routerjs');
});

// using promises

// router.post('/register', (req,res) => {
//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error: "Please fill all the fields properly"});
//     }

//     User.findOne({email: email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error: "Email already exists"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message: "user registered successfully"});
//         }).catch((err) => res.status(500).json({error: "Failed to register"}));
//     }).catch(err => {console.log(err);});
// })

// Async - await

router.post('/register', async (req,res) => {
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error: "Please fill all the fields properly"});
    }

    try{
       const userExist = await User.findOne({email: email});

       if(userExist) {
        return res.status(422).json({error: "Email already exists"});
       } else if(password != cpassword) {
        return res.status(422).json({error: "Email already exist"});
       } else {
        const user = new User({name, email, phone, work, password, cpassword});

        await user.save();

        res.status(201).json({message: 
        "user registered successfully"});
       }
    } catch(err) {
        console.log(err);
    }
})

// login route

router.post('/signin', async (req,res) => {
    // console.log(req.body);
    // res.json({message: "awesome"});
    try {
        let token;
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({err: "Please fill all the fields"});
        }

        const userLogin = await User.findOne({email: email});

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

        if(!isMatch) {
            res.status(400).json({message: "Invalid Credentials"});
        } else {
            res.json({message: "user signin successful"});
        }
        } else {
            res.status(400).json({message: "Invalid Credentials"});
        }

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;