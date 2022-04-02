const conf = require('./../config/config');
const pool = conf.dbpos();

function searchForUser(address, callback) {
    console.log(address)
    const query = "SELECT address,nonce FROM users"
        + " WHERE address=$1";
    pool.query(query, [address.address], (err, res) => {
        //console.log(res.rows[0].nonce)
        if(res) callback(err, res.rows);
        else callback(err, null);
    });
    return callback;
}


function insertUser(user, callback) {
    const query = "INSERT INTO users (address,role,nonce)"
        + " VALUES ('" + user.address + "','"+ user.role +"','"+ user.nonce + "')";
    console.log("> query: ", query);
    pool.query(query, (err, res) => {
        if(res) callback(err, res.rows);
        else callback(err, res);
    });
    return callback;
}

function receiveNonce(address,callback){
    const query = "SELECT address, nonce FROM users"
        + " WHERE address=$1";
    pool.query(query, [address.address], (err, res) => {
        //console.log(res.rows[0].nonce)
        if(res) callback(err, res.rows[0].nonce);
        else callback(err, null);
    });
}

module.exports = {
    Find: function(address, cb) {
        return searchForUser(address, cb);
    },
    InsertUser: function(user, cb) {
        return insertUser(user, cb);
    },
    ReceiveNonce:function(address,cb){
        return receiveNonce(address,cb)
    }
}