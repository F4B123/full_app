var queryMaker = require('../queries/querycontroller');
var bcrypt = require('bcryptjs');
var Web3 = require('web3');
var web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/8a8a6f324f164e55a75fbbff388f020a"
    )
  );

var Personal = require('web3-eth-personal');

// "Personal.providers.givenProvider" will be set if in an Ethereum supported browser.
var personal = new Personal(new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/8a8a6f324f164e55a75fbbff388f020a"
  ));
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

    saveUser(callback){
        let userResponse = this.generateStructure();
        queryMaker.InsertUser(userResponse, ( err, res )=>{
            if(err) callback(err, res);
            else callback(err, userResponse);
        }); 
    }

    generateStructure(){
        return {
            address:this.address,
            role:this.role,
            nonce:this.nonce
        };
    }

}


function userExists(address, cb){
    queryMaker.Find(address, (e, res)=>{
        if( !res){
            cb(e, null)
        }
        else{
            cb(e, res.length>0);
        }
        
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

    //user ecRecovery
    console.log("validadndo",user)

    //here we should validate the user
    personal.ecRecover(user.address, user.nonce, user.signature).then("validado",console.log)
    
}

function getNonce(address,cb){
    queryMaker.ReceiveNonce(address, (err,res)=>{
        console.log(res,"respuesta")
        const nonce = res
        // if(res){
        //     return nonce
        // }
        if(!res) cb(err, null);
        else if(res) {
            //console.log("allright")
            cb(err, nonce);
            
        }
        else cb(err, null);
    }
    )
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
    },
    returnNonce:function(user, callback) {
        getNonce(user, callback);
    }


}