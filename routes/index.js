const express = require('express');
const categoriesRoutes = require('./categories');
const productsRoutes = require('./products')
const usersRoutes = require('./users');
const ordersRoutes = require('./orders');
const router = express.Router();
require('dotenv/config');

const api = process.env.API_URL;

router.use(`${api}/categories`, ((req, res) => categoriesRoutes(req,res)));
router.use(`${api}/products`, ((req, res) => productsRoutes(req,res)));
router.use(`${api}/users`, ((req, res) => usersRoutes(req,res)));
router.use(`${api}/orders`, ((req, res) => ordersRoutes(req,res)));

module.exports = router;