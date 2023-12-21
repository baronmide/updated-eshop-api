const express = require('express');
const router = express.Router();
const userController  = require('../controller/userController');

router.get('/', userController.getAll);
router.get('/:id',userController.getById);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.delete('/:id', userController.delete);


module.exports = router;