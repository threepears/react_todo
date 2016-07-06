const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(_, res) { res.sendFile(path.join(__dirname, './public')) });


// Establish database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my3PearSqL!',
  socketPath: '/tmp/mysql.sock',
  database: 'tasks'
});


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
