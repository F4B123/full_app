const conf = require('./../config/config');
const pool = conf.dbpos();

function searchForUser(address, callback) {
    console.log(address)
    const query = "SELECT address FROM users"
        + " WHERE address=$1";
    pool.query(query, [address.address], (err, res) => {
        if(res) callback(err, res.rows);
        else callback(err, null);
    });
    return callback;
}


function insertUser(user, callback) {
    const query = "INSERT INTO users (address,role)"
        + " VALUES ('" + user.address + "','"+ user.role +"')";
    console.log("> query: ", query);
    pool.query(query, (err, res) => {
        if(res) callback(err, res.rows);
        else callback(err, res);
    });
    return callback;
}

module.exports = {
    Find: function(address, cb) {
        return searchForUser(address, cb);
    },
    InsertUser: function(user, cb) {
        return insertUser(user, cb);
    }
}