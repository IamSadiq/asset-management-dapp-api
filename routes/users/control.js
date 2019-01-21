var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');
const Web3 = require('web3');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./users-model');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var usersCount;

// GET VERB | ENDPOINT
router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err) throw err;
        res.json(users);
        usersCount = users.length + 1;

        console.log(users);
        console.log("usersCount: " + usersCount);        
    });
});

// GET particular user using email
router.get('/:userID', function(req, res){
    let user_id = req.params.userID;
    User.find({userID: user_id }, function(err, user){
        if(err)
            res.json({status: 'Error'});
        else
            res.status(200).json(user);
    });
});

// POST VERB | ENDPOINT
router.post('/', function(req, res){

    // var userChunk = req.body.user;
    var userChunk = {
        email: req.body.email, 
        username: (req.body.email).split('@')[0],
        password: req.body.password,
        userID: 0,
        address: "iamgroot"
    }

    User.find({}, function(err, users){
        if(err) throw err;

        let user_id = users.length + 1;
        userChunk.userID = user_id;
        userChunk.address = web3.eth.accounts[user_id];

        console.log(users);
        console.log("users count: " + user_id);
    });

    const newUser = User(userChunk);
    
    newUser.save(function(err){
        // if(err) throw err;
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        else return res.status(200).send('User committed successful!');
    });
    
});

// Route to update a user in the DB
router.post('/update/', function(req, res) {
    var userChunk = req.body.data;

    User.find({email: userChunk.email}, function(err, user) {
        if (err)res.status(500).send(err);
        user = userChunk;
        res.status(200).json(user);
    });
});

// DELETE VERBS | ENDPOINTS

// Delete Particular User
router.get('/delete/:id', function(req, res){

    User.remove({userID: req.params.id}, function(error, response) {
        if (error) {
            res.status(500).send("Failed to delete user");
            console.error('Error deleting user: ' + error);
        }else{
            res.status(200).send("Done deleting user");
            console.log('Done deleting user');
        }
        
        // callback();
    });
});


// Delete All Users
router.get('/deleteAll/', function(req, res){
    User.remove({}, function(error, response) {
        if (error)throw error;

        res.status(200).send("All Users deleted");
        console.log('All Users deleted"');
        // callback();
    });
});

module.exports = router;