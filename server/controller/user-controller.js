var UserModel = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(user){
    return jwt.sign({address:user.address}, config.jwtSecret, {
        //expiresIn: 3600
        expiresIn: 60000
    });
}


exports.registerUser = (req,res) =>{
    console.log(req.body)
    //verify if is a valid address

    //verify that it aint already registered
    UserModel.findUser({
        address:req.body.address
    }, (err,address)=>{
        if(err) return res.status(400).json({'msg': err});
        if(address) return res.status(400).json({'msg':'The address is already registered'});
        let newUser = UserModel.createUser(req.body);
        console.log(newUser);
        newUser.saveUser((err, user)=>{
            if(err) return res.status(400).json({'msg':'Error found saving user\n '+'Error\n'+JSON.stringify(err)});
            return res.status(201).json(user);
        })
    })
}

exports.loginUser = (req,res) => {
    if (req.body.signature != null){
        console.log("hay firma")
        UserModel.validateAddress(req.body)
        // return res.status(200).json({
        //     token: createToken(req.body)
        // });
        return res.send(createToken(req.body))
    }
    else{
        if (!req.body.address ) {
            return res.status(400).json({'msg': 'login incomplete'});
        }
    
        //TODO
        // get user
        //add rest of functionality
        console.log("no hay firma")
        UserModel.getUser({address: req.body.address}, (err, user)=>{
            if(err){
                return res.status(400).json({'msg': err});
            }
            if(!user){
                return res.status(400).json({'msg':'The user does not exists'});
            }
            let actualUser = UserModel.createUser(user);
    
            actualUser.compareAddress(req.body.address, (err, isMatch) =>{
                console.log(isMatch,req.body.address,actualUser.address)
                //if (isMatch && !err && req.body.address == actualUser.address)
                if ( req.body.address == actualUser.address){
                    console.log("yes")
                    return res.status(200).json({
                        welldone:"good"
                    });
    
                }else{
                    return res.status(400).json({'msg':'incorrect address'});
                }
            });
        });
    }
    
}