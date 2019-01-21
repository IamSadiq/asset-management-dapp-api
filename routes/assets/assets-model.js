const mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var assetSchema = new Schema({
    chasis: String,
    engine: String,
    v_type: String,
    v_make: String,
    dateCreated: String,
    userID: String
});

module.exports = mongoose.model('Assets', assetSchema);