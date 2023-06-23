
// MySQL 
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ci_wrp_crm"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT COUNT(*) FROM tbl_contacts WHERE CONCAT(first_name, '', last_name) LIKE '%S%'", function (err, result) {
    if (err) throw err;
    result.map((contact)=>{
      console.log(contact);
    })
  });
});