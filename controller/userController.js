const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const { create, findAll, findOne, findByIdAndRemove } = require('../services/user.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async delete(req, res) {
        await findByIdAndRemove(req.params.id)
            .then((user) => {
                if (user) {
                    return res.status(200).json({ success: true, message: 'the user is deleted!' });
                } else {
                    return res.status(404).json({ success: false, message: 'user not found!' });
                }
            })
            .catch((err) => {
                return res.status(500).json({ success: false, error: err });
            });
    },

    async getAll(req, res) {
        const userList = await User.find().select('-passwordHash');

        if (!userList) {
            res.status(500).json({ success: false });
        }
        res.send(userList);
    },

    async getById(req, res) {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if (!user) {
            res.status(500).json({ message: 'The user with the given ID was not found' });
        }
        res.status(200).send(user);
    },

    async createUser(req, res) {
        try {
            const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
    
            if (!password) {
                return res.status(400).send('Password is required');
            }
    
            const hashedPassword = bcrypt.hashSync(password, 10);
    
            const user = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                isAdmin,
                street,
                apartment,
                zip,
                city,
                country
            });
    
            const savedUser = await user.save();
    
            if (!savedUser) {
                return res.status(400).send('The user cannot be created');
            }
    
            res.send(savedUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }, 
    
    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            // Check if both email and password are provided
            if (!email || !password) {
                return res.status(400).send('Both email and password are required');
            }
    
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(400).send('The user not found');
            }

            console.log(user);

            const token = jwt.sign(
                {
                    userId: user._id
                },
                'secret'
            );

            console.log(user.password);

    
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200).send({ user, token });
            } else {
                res.status(400).send('Password is wrong');
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
};
