const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
	if (err){
		if(err.code === 'PROTOCO'){
			console.error('DATABASE CONNECTION WAS CLOSED');
		}
		if(err.code === 'ER_CON_COUNT_ERROR'){
			console.err('DATABASE HAS TO MANY CONNECTIONS');
		}
		if(err.code === 'ECONNREFUSED'){
			console.err('DATABASE CONNECTION WAS REFUSED')
		}
	}

	if (connection) connection.release();
	console.log('DB IS CONNECTED');
	return;
});


pool.query = promisify(pool.query);
module.exports = pool;