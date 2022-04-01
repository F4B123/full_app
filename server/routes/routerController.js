const express = require('express');
const router = express.Router();
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");


router.get('/api', (req,res)=>{
    return res.json({message:"Server working!!"});
});

router.post('/register', registerRouter);
router.post('/login', loginRouter);


module.exports = router;