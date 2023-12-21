const express = require('express');
const router = express.Router();
const {create, findAll, findOne, findByIdAndRemove} = require('../services/user.services')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    async delete(req, res){
        await findByIdAndRemove(req.params.id).then(user =>{
            if(user) {
                return res.status(200).json({success: true, message: 'the user is deleted!'})
            } else {
                return res.status(404).json({success: false , message: "user not found!"})
            }
        }).catch(err=>{
           return res.status(500).json({success: false, error: err}) 
        })
    },

    async getAll(req,res){
        const userList = await User.find().select('-passwordHash');
    
        if(!userList) {
            res.status(500).json.apply({success: false})
        }
        res.send(userList);
    },

    async getById(req, res){
        const user = await User.findById(req.params.id).select('-passwordHash');
    
        if(!user) {
            res.status(500).json({message: 'The user with the given ID was not found'})
        }
        res.status(200).send(user);
    },

    async createUser(req,res){
        const {name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body
        const obj = {name, email, passwordhash: password, phone, isAdmin, street, apartment, zip, city, country }
        const result = await create(obj)
    
        if(!result)
        return res.status(400).send('the user cannot be created')
    
        res.send(result);
    }, 

    async login (req, res) {

        const {email, password} = req.body
    
        const user = await findOne({email})

        const secret = process.env.secret;
    
        if(!user) {
            return res.status(404).send('The user not found');
        }
    
        if(user && await bcrypt.compare(password, user?.passwordhash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                },
                secret,
                {expiresIn : '24h'}
            )
           
            res.status(200).send({user, token: token}) 
        } else {
           res.status(400).send('password is wrong!');
        }
    },
}