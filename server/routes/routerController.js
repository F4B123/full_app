const express = require('express');
const router = express.Router();
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");

//temp
const userController = require('../controller/user-controller');


router.get('/api', (req,res)=>{
    return res.json({message:"Server working!!"});
});

router.post('/nonce', userController.getNonce);

router.post('/register', registerRouter);
router.post('/login', loginRouter);


module.exports = router;