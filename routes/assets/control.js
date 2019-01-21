var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var https = require('https');



//Contract Set Up
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const code = fs.readFileSync('./asset-contract.sol').toString();
var compiledCode = solc.compile(code);

// var abiDef = JSON.parse('[{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"asset_uid","type":"string"},{"name":"dateAcquired","type":"string"}],"name":"transferAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"vehicleID","type":"string"}],"name":"getTransactionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"vehicleID","type":"string"},{"name":"txID","type":"uint256"}],"name":"getVehicleTrail","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"chasis","type":"string"},{"name":"engine","type":"string"},{"name":"v_type","type":"string"},{"name":"v_make","type":"string"},{"name":"dateCreated","type":"string"}],"name":"newAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"uid","type":"string"}],"name":"getAsset","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]');
var abiDef = JSON.parse(compiledCode.contracts[':AssetManagement'].interface);
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// need to get the ABI from smart contract and paste
var assetContract = web3.eth.contract(abiDef);

//get contract instance
var address = '0x9a172e9b720cfddb15c15fd40329a29661d02984';
const contractInstance = assetContract.at(address);



router.use(bodyParser.urlencoded({extended: true }));
router.use(bodyParser.json());

var Assets = require('./assets-model');
// var User = require('../users/users-model');

// GET all assets
router.get('/', function(req, res){
    Assets.find({}, function(err, users){
        if(err) throw err;
        else{
            res.json(users);
            console.log(users);
        }
    });
});

// GET transaction count for particular asset
router.get('/transactions/:vehicleID', function(req, res){
    res.send(contractInstance.getTransactionCount.call(req.params.vehicleID).toLocaleString());
});

// Post vehicleID & txID to retrieve tx trail for a particular asset
router.post('/transactions/trailing/', function(req, res){
    var txID = req.body.txID;
    var vehicleID = req.body.vehicleID;
    res.json(contractInstance.getVehicleTrail.call(vehicleID, txID));
});

// GET specific asset
router.get('/:vehicleID', function(req, res){
    // get particular asset
    res.json(contractInstance.getAsset.call(req.params.vehicleID));

    Assets.find({chasis: req.params.vehicleID }, function(err, user){
        // res.json(user);
        console.log(user);
    });
});


// Post new asset document
router.post('/', function(req, res){
    // let chunk = req.body.chunk;
    let chunk = {
        chasis: req.body.chasis,
        engine: req.body.engine,
        v_type: req.body.v_type,
        v_make: req.body.v_make,
        dateCreated: req.body.dateCreated,
        userID: req.body.userID,
    }

    //Save to Chain
    contractInstance.newAsset(chunk.chasis, chunk.engine, chunk.v_type, chunk.v_make, chunk.dateCreated, {from: web3.eth.accounts[parseInt(chunk.userID)], gas: 4700000})
    
    //prepare DB
    let newAsset = Assets(chunk);
    
    //save to DB
    newAsset.save(function(err){
        // if(err) throw err;
        if(err) 
            return res.status(500).json({status: "Committed to Chain But Unable to commit to database."});
        else 
            return res.status(200).json({status: "Successfully committed to Chain & database."});
        console.log('Asset saved!!');
    });
});

// Route to update an asset in the DB
router.post('/transfer/', function(req, res) {
    // let details = req.body.data;
    let details = {
        vehicleID: req.body.vehicleID,
        dateAcquired: req.body.dateAcquired,
        userID: req.body.userID,
        recipientID: req.body.recipientID,
    }

    let vehicleID = details.vehicleID;
    let dateAcquired = details.dateAcquired;

    let uid = details.userID;
    let rid = details.recipientID;

    //transfer asset ownership
    res.json(contractInstance.transferAsset(web3.eth.accounts[parseInt(rid)], vehicleID, dateAcquired, {from: web3.eth.accounts[parseInt(uid)], gas: 4700000}));
    
    // update DB
    Assets.find({chasis: vehicleID }, function(err, user){
        user.userID = rid;
        console.log(user);
    });

});

module.exports = router;