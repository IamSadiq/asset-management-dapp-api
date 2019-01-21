// 
pragma solidity ^0.4.19;

contract AssetManagement{

    struct Asset{
        address owner;
        string uid;
        string engine;
        string v_type;
        string v_make;
        bool initialized;
        string DateAcquired;
        string DateCreated;
    }

    struct Transaction{
        address To;
        address From;
        string dateofTransaction;
    }

    mapping (string => Asset) private allAssets;
    mapping(string => Transaction[]) private TransactionStore;
    mapping(string => uint) transactionCount;

    // function Vehicle() public{}

    function newAsset(string chasis, string engine, string v_type, string v_make, string dateCreated) public{
        // Asset memory asset = Asset({owner:msg.sender, plate:plate, uid:chasis, chasis:chasis, engine:engine, v_type:v_type, v_make:v_make});
        if(!allAssets[chasis].initialized){
            allAssets[chasis] = Asset({owner:msg.sender, uid:chasis, engine:engine, v_type:v_type, v_make:v_make, initialized:true, DateCreated: dateCreated, DateAcquired: dateCreated});
            
            TransactionStore[chasis].push(Transaction({To: msg.sender, From: msg.sender, dateofTransaction: dateCreated}));
            transactionCount[chasis]++;
        }
    }

    function transferAsset(address recipient, string asset_uid, string dateAcquired) public{
        if(allAssets[asset_uid].initialized && allAssets[asset_uid].owner == msg.sender){
            allAssets[asset_uid].owner = recipient;
            allAssets[asset_uid].DateAcquired = dateAcquired;
            TransactionStore[asset_uid].push(Transaction({To: recipient, From: msg.sender, dateofTransaction: dateAcquired}));
            transactionCount[asset_uid]++;

        }
    }

    function getAsset(string uid) public constant returns (address, string, string, string){
        return (allAssets[uid].owner, allAssets[uid].engine, allAssets[uid].v_type, allAssets[uid].v_make);
    }


    function getVehicleTrail(string vehicleID, uint txID) public constant returns (address, address, string){
        return (TransactionStore[vehicleID][txID].To, TransactionStore[vehicleID][txID].From, TransactionStore[vehicleID][txID].dateofTransaction);
    }

    function getTransactionCount(string vehicleID) public constant returns (uint){
        return transactionCount[vehicleID];
    }
}