const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    userID: Number,
   email: String,
   username: String,
   password: String,
   address: String,
   assets: [
       {vid: String}
    ]
});

module.exports = mongoose.model('User', userSchema);