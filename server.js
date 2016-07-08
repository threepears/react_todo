"use strict";

const express = require('express');
const app = express();

const path = require('path');
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection('mysql://tp4kkvyi5zttxvwm:skf9vi28nm5p91po@nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/emspx5n4ycnze24b');


// Get list of tasks from database
app.get('/tasks', function(req, res) {

  connection.query('SELECT * FROM `tasklist`', function (error, results, fields) {
    if (error) {
      console.error('Error: ' + err.stack);
      return;
    }
    res.send(results);

  });
});


// Post new task to database
app.post('/tasks/:task', function(req, res) {

  const newTask = req.params.task;
  const sql = 'INSERT INTO `tasklist` (taskname, iscompleted) VALUES (' + connection.escape(newTask) + ', "false")';

  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error.stack);
      return;
    }
    console.log(results);
    res.send(results);
  });
});


// Change completed status of task in database
app.put('/tasks/complete/:task/:state', function(req, res) {

  const newTask = req.params.task;
  const newState = req.params.state;
  const revisedState = (newState === "true") ? "false" : "true";
  const sql = 'UPDATE `tasklist` SET iscompleted=' + connection.escape(revisedState) + ' WHERE taskname=' + connection.escape(newTask);

  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error.stack);
      return;
    }
    console.log(results);
    res.send(results);
  });
});


// Replace old task name with newly edited name
app.put('/tasks/edit/:oldtask/:newtask', function(req, res) {

  const oldTask = req.params.oldtask;
  const newTask = req.params.newtask;
  const sql = 'UPDATE `tasklist` SET taskname=' + connection.escape(newTask) + ' WHERE taskname=' + connection.escape(oldTask);

  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error.stack);
      return;
    }
    console.log(results);
    res.send(results);
  });
});


// Delete task from database
app.delete('/tasks/:task', function(req, res) {

  const newTask = req.params.task;
  const sql = 'DELETE FROM `tasklist` WHERE taskname=' + connection.escape(newTask);

  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error.stack);
      return;
    }
    console.log(results);
    res.send(results);
  });
});


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
