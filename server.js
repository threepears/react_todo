"use strict";

const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 3000;


app.get('/', function(req, res) {
  console.log("HELLOOOOOOO!!!!!!!");
  res.send("HELLLOOOOOOO!");
})


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
