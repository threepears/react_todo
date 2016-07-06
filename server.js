const express = require('express');
const app = express();

const path = require('path');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my3PearSqL!',
  socketPath: '/tmp/mysql.sock',
  database: 'tasks'
});


app.get('/tasks', function(req, res) {

  connection.query('SELECT * FROM `tasklist`', function (error, results, fields) {
    if (error) {
      console.error('Error: ' + err.stack);
      return;
    }
    res.send(results);

  });
});


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
