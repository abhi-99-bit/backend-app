const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "nodejs",
  password: "abhishek123",
  database: "daily_expenses_db",
  port: 3306,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connection is established");
});

module.exports = connection;
