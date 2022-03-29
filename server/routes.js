var express = require('express');
routes = express.Router();
var userController = require('./controller/user-controller');

//var passport = require('passport');

routes.get('/', (req,res)=>{
    return res.send('hello api server talking');
});


//routes.post('/register', passport.authenticate('jwt', { session: false }), userController.registerUser);
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);


module.exports = routes;