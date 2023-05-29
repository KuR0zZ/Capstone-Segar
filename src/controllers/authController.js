const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const postRegister = async (req, res) => {
    const {username, password, email} = req.body;
    try{
        const userAlreadyExist = await User.findOne({ email: email });

        if(userAlreadyExist){
            return res.status(200).json({ error: false, msg: 'User already exist'});
        }

    } catch(err) {
        return res.status(500).json({ error: true, msg: 'Something went wrong'});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        });
    
        await newUser.save();
        return res.status(200).json({ error: false, msg: 'User registered'});
    } catch (err) {
        return res.status(500).json({ error: true, msg: 'Something went wrong, check your data'});
    }
}

const postLogin = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userCheckWithEmail = await User.findOne({ email: email });
    
        if(!userCheckWithEmail){
            return res.status(200).json({error: false, msg: 'User not found, check again your email and password'});
        }
        
        if(!bcrypt.compare(userCheckWithEmail.password, password)){
            return res.status(200).json({error: false, msg: 'User not found, check again your email and password'});
        }
    
        const jwtToken = jwt.sign({ id: userCheckWithEmail._id, email: userCheckWithEmail.email }, process.env.JWT_SECRET);
    
        const userData = {
            id: userCheckWithEmail._id,
            username: userCheckWithEmail.username,
            email: userCheckWithEmail.email,
            joinedAt: userCheckWithEmail.createdAt,
            token: jwtToken
        }
        
        return res.status(200).json({ error:false, message: 'Login successful', data: userData });
    } catch (err) {
        return res.status(200).json({ error:true, message: 'Something went wrong' });
    }
}

const postEditUser = async (req, res) => {
    const {id, username, email, joinedAt} = req.body;
    try {
        const user = await User.findOne({ _id: id });
    
        user.username = username;
    
        await user.save();
    
        return res.status(200).json({ error: false, message: 'Data has been edited'});
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Something went wrong'});
    }
}

module.exports = {
    postRegister,
    postLogin,
    postEditUser,
}