import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req,res) => {
    try {
        const users = await User.find().select({ name: 1, email: 1});
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const register = async (req,res) => {
    const { name, email, password, confPassword }= req.body;
    if(password !== confPassword) return res.status(400).json({msg: "password dan confirm password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hasspassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name: name,
        email: email,
        password: hasspassword
    })
    try {
        const inserteduser = await newUser.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req,res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: "wrong password"});
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name , email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.updateOne({_id: userId}, {$set:{
            refresh_token: refreshToken
        }});
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg: "email tidak ditemukan"});
    }
}

export const logout = async(req,res) => {
    const refreshToken = req.cookies.refreshtoken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        refresh_token: refreshToken
    });
    if(!user) return res.sendStatus(204);
    const userId = user._id;
    await User.updateOne({_id: userId}, {$set:{
        refresh_token: null
    }});
    res.clearCookie('refreshtoken');
    return res.sendStatus(200);
}