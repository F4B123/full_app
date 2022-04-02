var UserModel = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
const Web3 = require('web3');
const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/8a8a6f324f164e55a75fbbff388f020a"
    )
  );

function createToken(user){
    return jwt.sign({address:user.address,nonce:user.nonce,role:user.role}, config.jwtSecret, {
        expiresIn: 60000
    });
}


exports.registerUser = (req,res) =>{
    UserModel.findUser({
        address:req.body.address
    }, (err,address)=>{
        if(err) return res.status(400).json({'msg': err});
        if(address) {
            console.log("The address is already registered")
            return res.status(400).json({'msg':'The address is already registered'});
        }
        let newUser = UserModel.createUser(req.body);
        newUser.saveUser((err, user)=>{
            if(err) return res.status(400).json({'msg':'Error found saving user\n '+'Error\n'+JSON.stringify(err)});
            return res.status(201).json(user);
        })
    })
}

exports.loginUser = async (req,res) => {
    if (req.body.signature != null){
        UserModel.validateAddress(req.body)
        //return res.send(createToken(req.body))
        return res.json({'loged': 'yes'})
    }
    else{
        if (!req.body.address ) {
            return res.status(400).json({'msg': 'login incomplete'});
        }
        //console.log("no hay firma")
        UserModel.getUser({address: req.body.address}, (err, user)=>{
            if(err){
                return res.status(400).json({'msg': err});
            }
            if(!user){
                return res.status(400).json({'msg':'The user does not exists'});
            }
            let actualUser = UserModel.createUser(user);
            actualUser;
            return res.status(200).json({'login':'complete'});
            
        });
    }  
}

exports.getNonce = async (req,res) => {
    console.log("arrived")
    if (!req.body.address ) {
        return res.status(400).json({'msg': 'did not recieve address'});
    }
    else{
        UserModel.returnNonce({address: req.body.address},(err, nonce)=>{
            if(err){
                return res.status(400).json({'msg': err});
            }
            if(!nonce){
                return res.status(400).json({'msg':'The user does not exists'});
            }
            console.log(nonce,"respuesta aca")
            
            return res.status(200).json({'login':'nonce returned','nonce':nonce});
            
        });

        
    }

}


exports.loginGetRole = (req,res) =>{
    const roleContract = new web3.eth.Contract(
    [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "address1",
                    "type": "string"
                }
            ],
            "name": "getRole",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],
    '0xCA28114068143Fc496E65595E8740aDD65C6D62A')
    console.log(req)
    roleContract.methods.getRole("0x2E17F6Ad448ec884649d4b0Dc54F72B24aEf2e34").call( function(error, result) {
        //console.log(result,error);
        res.json({role:result})
    });
    
    
} 

