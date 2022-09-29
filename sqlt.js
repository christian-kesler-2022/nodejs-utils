const mysql = require('mysql');

var sqlt = {
  initialize: function () {
    var con = mysql.createConnection({
      host: '172.17.0.2',
      user: 'root',
      password: 'secret',
      database: `ironclad`,
    });

    con.query(
      'CREATE DATABASE IF NOT EXISTS `ironclad` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;'
    );
    con.query('USE `ironclad`;');
    con.query(
      'CREATE TABLE IF NOT EXISTS `accounts` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `username` varchar(50) NOT NULL,  `password` varchar(255) NOT NULL,  `email` varchar(100) NOT NULL,  PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;'
    );
    con.query(
      "INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');"
    );

    return con;
  },
};

module.exports = sqlt;
