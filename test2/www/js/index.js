var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'your-username',
      password : 'your-password',
      database : 'wordpress',
    }
);
 
connection.connect();
 
var queryString = 'SELECT * FROM wp_posts';
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
});
 
connection.end();