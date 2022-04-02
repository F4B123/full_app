const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

router.post('/login', userController.loginUser);

//router.get('/contract',userController.loginGetRole);

module.exports = router;