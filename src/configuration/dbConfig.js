import mysql from 'mysql2/promise';
const connection=mysql.createPool({
    host:'smart-app.cbaa68y6oe70.eu-north-1.rds.amazonaws.com',
    user:'admin',
    password:'Sugunanakka123',
    database:'smart_app',
    port:3306
})
try {
    const conn = await connection.getConnection();
    console.log('Connected to MySQL...');
    conn.release(); // Always release when using getConnection
  } catch (err) {
    console.error('MySQL connection error:', err);
  }

// connection.connect((err)=>{
//    if (err) {
//     console.error('MySQL connection error:', err);
//   } else {
//     console.log('Connected to MySQL...');
//   }
// });
// connection.connect((err) => {
  // if (err) {
  //   return console.error('Connection error:', err);
  // }

//   console.log('Connected to MySQL');

//   const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
//   connection.query(insertQuery, ['Debug User', 'debug@example.com', 'testpass'], (err, result) => {
//     if (err) {
//       console.error('Insert error:', err);
//     } else {
//       console.log('Insert result:', result);
//     }

//     connection.end();
//   });
// });

export default connection;
