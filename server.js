"use strict";

const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
