const mysql = require("mysql2");

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE

const conn = mysql.createConnection({
  host, user, password, database
});

module.exports = {
  connectDatabase: () => {
    console.log({ host, user, password, database });

    conn.connect((err) => {
      if (err) throw err;
      console.log("Connected!");

      var query = `
      CREATE TABLE IF NOT EXISTS company (
        companyId INT PRIMARY KEY, 
        companyName VARCHAR(50)
      );`

      conn.query(query, (err, result) => {
        if (err) throw err;
        console.log({ result });
      });

      var query = `
      CREATE TABLE IF NOT EXISTS user (
        userId INT PRIMARY KEY,
        userName VARCHAR(50),
        email VARCHAR(100),
        mobile VARCHAR(20),
        password VARCHAR(100),
        companyId INT,
        FOREIGN KEY (companyId) REFERENCES company(companyId)
      );`;

      conn.query(query, (err, result) => {
        if (err) throw err;
        console.log({ result });
      });

      // var query = "INSERT INTO company (companyId, companyName) VALUES ?"
      // var comapanies = [
      //   [1, 'company1'], 
      //   [2, 'company2'], 
      //   [3, 'company3']
      // ];
      // conn.query(query, [comapanies], (err, result) => {
      //   if (err) throw err;
      //   console.log({ result });
      // });

      // var query = "INSERT INTO user (userId, userName, email, mobile, password, companyId) VALUES ?"
      // var users = [
      //   [1, 'user1', 'user1@gmail.com', 123, 'user1', 1],
      //   [2, 'user2', 'user2@gmail.com', 124, 'user2', 1],
      //   [3, 'user3', 'user3@gmail.com', 125, 'user3', 2],
      //   [4, 'user4', 'user4@gmail.com', 126, 'user4', 2],
      //   [5, 'user5', 'user5@gmail.com', 127, 'user5', 3],
      //   [6, 'user6', 'user6@gmail.com', 128, 'user6', 3],
      // ];
      // conn.query(query, [users], (err, result) => {
      //   if (err) throw err;
      //   console.log({ result });
      // });
    });
  },
  db: conn
};
