var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Odak1098!',
    database : 'hl7'
});

let sqlSorgusu = 'SELECT * FROM sender';

connection.connect(function (err) {
    if (err) throw err;
    connection.query(sqlSorgusu, function (err, results) {
        if (err) throw err.message;
        console.log(results);
    });
});