var queryMaker = require('../queries/querycontroller');
var bcrypt = require('bcryptjs');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

//nonce-- for each user generate a random string
class UserP{
    constructor(bodyRequest) {
        this.address = bodyRequest.address;
        this.nonce = this.generateNonce();
        this.role = "user";
    }

    set address(address){
        this._address=address;
    }

    get address(){
        return this._address;
    }


    generateNonce(){return Math.floor(Math.random() * 1000000);}

    // getUniqueId(len){
    //     return crypto
    //             .randomBytes(Math.ceil((len * 3) / 4))
    //             .toString('base64') // convert to base64 format
    //             .slice(0, len) // return required number of characters
    //             .replace(/\+/g, '0') // replace '+' with '0'
    //             .replace(/\//g, '0') // replace '/' with '0'
    // }

    //Change from comparePassword to compare address
    // compareAddress(candidateAddress, cb){
    //     bcrypt.compare(candidateAddress, this.address, (err, isMatch)=>{
    //         console.log(candidateAddress)
    //         console.log(this.address)
    //         if(err) return cb(err);
    //         cb(null, isMatch);
    //     });
    // }

    // preSave(callback){
    //     var user = this;
    //     bcrypt.genSalt(10, function(err_, salt){
    //         if (err_) {
    //             callback(err_);
    //             return err_;
    //         }else{
    //             bcrypt.hash(user.address, salt, function(err__, hash){
    //                 if(err__){
    //                     callback(err__);
    //                     return err__;
    //                 }
    //                 user.address = hash;
    //                 callback(err__);
    //                 return err__;
    //             });
    //         }
    //     });     
    // }

    // saveUser(callback){
    //     this.preSave((e)=>{
    //         if(e){
    //             console.log("Error in hash procedure, impossible to register user ", e);
    //             callback(e, "Error in hash procedure, impossible to register user ");
    //         }else{
    //             let userResponse = this.generateStructure();
    //             console.log(userResponse)
    //             queryMaker.InsertUser(userResponse, ( err, res )=>{
    //                 if(err) callback(err, res);
    //                 else callback(err, userResponse);
    //             }); 
    //         }
    //     });
    // }

    saveUser(callback){
        let userResponse = this.generateStructure();
        //console.log(userResponse)
        queryMaker.InsertUser(userResponse, ( err, res )=>{
            if(err) callback(err, res);
            else callback(err, userResponse);
        }); 
    }

    generateStructure(){
        return {
            address:this.address,
            role:this.role
        };
    }
}


function userExists(address, cb){
    queryMaker.Find(address, (e, res)=>{
        cb(e, res.length>0);
    });
}

function searchUser(user, cb){
    queryMaker.Find(user, (e, res)=>{
        if(!res) cb(e, null);
        else if(res.length>0) cb(e, res[0]);
        else cb(e, null);
    });
}

function validAddress(user, cb){
    console.log("validadndo",user)

    //here we should validate the user
    //web3.eth.personal.ecRecover(user.address, user.signature).then("validado",console.log)
    
}

module.exports = {
    findUser: function(address, callback) {
        userExists(address, callback);
    },
    getUser: function(userName, callback) {
        searchUser(userName, callback);
    },
    createUser: function(bodRequest) {
        return new UserP(bodRequest);
    },
    validateAddress: function(user, callback) {
        validAddress(user, callback);
    }
}