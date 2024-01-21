const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'sanoval', 
  password: '7722', 
  database: 'perpustakaan', 
};

const pool = mysql.createPool(dbConfig);

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

module.exports = query;
