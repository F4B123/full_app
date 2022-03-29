const Pool  = require('pg').Pool;

function getPool (){
    return new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'my_database',
        password: 'password',
        port: 5432,
        max: 5, // max number of clients in the pool
        idleTimeoutMillis: 60000
    });

}

module.exports = {
    jwtSecret: 'BLALBLLLABLALLBALBLABLALBLABLALBALBALABLAB',
    _dbpos: function(){return getConnectionObj()},
    dbpos: function(){return getPool()},
    _db: function(){return getPool();}
};