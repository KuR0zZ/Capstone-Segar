const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const postRegister = async (req, res) => {
    const {username, password, email} = req.body;
    try{
        const userAlreadyExist = await User.findOne({ email: email });

        if(userAlreadyExist){
            return res.status(409).json({ error: false, message: 'User already exist'});
        }

    } catch(err) {
        return res.status(500).json({ error: true, message: 'Something went wrong'});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        });
    
        await newUser.save();
        return res.status(201).json({ error: false, message: 'User registered'});
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Something went wrong, check your data'});
    }
}

const postLogin = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userCheckWithEmail = await User.findOne({ email: email });
    
        if(!userCheckWithEmail){
            return res.status(401).json({error: false, message: 'User not found, check again your email and password'});
        }
        
        const compareresult = await bcrypt.compare(password, userCheckWithEmail.password);

        if(!compareresult){
            return res.status(401).json({error: false, message: 'User not found, check again your email and password'});
        }
        
        const jwtToken = jwt.sign({ 
            id: userCheckWithEmail._id,
            username: userCheckWithEmail.username,
            email: userCheckWithEmail.email,
            joinedAt: userCheckWithEmail.createdAt,
        }, process.env.JWT_SECRET);
        
        try {
            userCheckWithEmail.token = jwtToken;
            await userCheckWithEmail.save();
        } catch (err) {
            return res.status(500).json({error: true, message: 'User not found, check again your email and password'});
        }

        return res.status(200).json({ error: false, message: 'Login successful', data: { token: jwtToken }});
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Something went wrong' });
    }
}

const postLogout = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email: email });

        user.token = 'null';

        await user.save();

        return res.status(200).json({ error: false, message: 'User logged out'});
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Something went wrong'});
    }
}

const getUserData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username, email, joinedAt} = verifyToken;
    
        return res.status(200).json({ error: false, message: "Data successfully decoded", data: {id, username, email, joinedAt }})
    } catch (err) {
        return res.status(500).json({ error: true, message: "Something went wrong"})
    }
}

const postEditUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = verifyToken;

    const { username, email } = req.body;
    try {
        const user = await User.findOne({ _id: id });
    
        user.username = username;
        user.email = email;
    
        await user.save();
    
        return res.status(200).json({ error: false, message: 'Data has been edited'});
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Something went wrong'});
    }
}

module.exports = {
    postRegister,
    postLogin,
    postLogout,
    postEditUser,
    getUserData,
}