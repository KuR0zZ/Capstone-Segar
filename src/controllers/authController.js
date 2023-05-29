const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const postRegister = async (req, res) => {
    const {name, password, email} = req.body;
    try{
        const userAlreadyExist = await User.findOne({ email: email });

        if(userAlreadyExist){
            return res.status(200).json({ success: true, msg: 'User already exist'});
        }
    } catch(err) {
        return res.status(500).json({ success: false, msg: 'Something went wrong'});
    }

    try{
        const newUser = new User({
            name: name,
            password: password,
            email: email,
        });
    
        await newUser.save();
        return res.status(200).json({ success: true, msg: 'User registered'});
    } catch (err) {
        return res.status(500).json({ success: true, msg: 'Something went wrong, check your data'});
    }
}

const postLogin = async (req, res) => {
    const {email, password} = req.body;

    const userCheckWithEmail = await User.findOne({ email: email });

    if(!userCheckWithEmail){
        return res.status(200).json({success: true, msg: 'User not found, check again your email and password'});
    }
    
    if(!userCheckWithEmail.password === password){
        return res.status(200).json({success: true, msg: 'User not found, check again your email and password'});
    }

    const jwtToken = jwt.sign({ id: userCheckWithEmail._id, email: userCheckWithEmail.email }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(200).json({ msg: 'Login successful', token: jwtToken});
}

module.exports = {
    postRegister,
    postLogin,
}