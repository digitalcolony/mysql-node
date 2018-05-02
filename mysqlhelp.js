const mysql = require("mysql");
require("./config/config");

const connection = mysql.createConnection({
  host: process.env["HOST"],
  database: process.env["DATABASE"],
  user: process.env["USER"],
  password: process.env["PASSWORD"]
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);

  const queryAllCafes =
    "SELECT venueName, address_1, city FROM venuesclean WHERE venueStatus = 'Active'";

  connection.query(queryAllCafes, (error, result, fields) => {
    // if any error while executing above query, throw error
    if (error) throw err;
    // if there is no error, you have the result
    // iterate for all the rows in result
    Object.keys(result).forEach(function(key) {
      let row = result[key];
      console.log(`VENUE: ${row.venueName} - ${row.address_1}, ${row.city}`);
    });
    //console.log(result[2].address_1);
  });

  connection.end();
});
