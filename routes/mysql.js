'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const mysql = require('mysql');



router.get("/tasks", (req, res) => {

  console.log("REQ BODY", req.body);



  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my3PearSqL!',
    socketPath: '/tmp/mysql.sock',
    database: 'tasks'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }

    console.log('Connected as id ' + connection.threadId);
  });

  connection.query('SELECT * FROM `tasklist`', function (error, results, fields) {
    if (error) {
      console.error('Error: ' + err.stack);
      return;
    }

    console.log(results);
    console.log(results[0].taskname);
    console.log(results[1].iscompleted);

    res.send(results);

  });

  // connection.query('CREATE DATABASE IF NOT EXISTS "tasks"', function (error, results, fields) {
  //   if (error) {
  //     console.error('Error: ' + err.stack);
  //     return;
  //   }

  //   console.log(results);
  //   console.log(fields);
  // });

  connection.end();

});

module.exports = router;



