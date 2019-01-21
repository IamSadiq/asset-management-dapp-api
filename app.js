const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/assets-management');

const app = express();
var AssetsCtrl = require('./routes/assets/control');
var UsersCtrl = require('./routes/users/control');

const port = process.env.PORT || 3333;

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use('/api/users', UsersCtrl);
app.use('/api/assets', AssetsCtrl);

app.listen(port);
console.log("Node server running on port: " + port);