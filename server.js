"use strict";

const express = require('express');
const app = express();

const path = require('path');
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection('mysql://tp4kkvyi5zttxvwm:skf9vi28nm5p91po@nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/emspx5n4ycnze24b');

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as sql id ' + connection.threadId);
});

// Get list of tasks from database
// app.get('/tasks', function(req, res) {

//   connection.query('SELECT * FROM `tasklist`', function (error, results, fields) {
//     if (error) {
//       console.error('Error: ' + err.stack);
//       return;
//     }
//     res.send(results);

//   });
// });

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
