const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hamza1999",
  database: "timetable",
  multipleStatements: true,
});

const checkConnection = () => {
  connection.connect((err) => {
    if (!err) {
      console.log("connected successfuly");
    } else {
      console.log("connection Failed");
    }
  });
};

module.exports = { checkConnection, connection };
