// ASSET MANAGEMENT Contract
pragma solidity ^0.4.19;

contract AssetManagement{

    struct Asset{
        address owner;
        bytes32 plate;
        bytes32 uid;
        bytes32 chasis;
        bytes32 engine;
        bytes32 v_type;
        bytes32 v_make;
        bool initialized;
    }

    struct Transaction{
        address to;
        address from;
        bytes32 tstamp;
    }

    bytes32[] public assetList;
    mapping (bytes32 => Asset) public allAssets;

    mapping (bytes32 => address) public transferedTo;
    mapping (bytes32 => address) public transferedFrom;

    mapping(uint8 => Transaction[]) public tx_list;
    uint8 public tx_count;

    // function Vehicle() public{}

    function newAsset(bytes32 plate, bytes32 chasis, bytes32 engine, bytes32 v_type, bytes32 v_make) public{
        // Asset memory asset = Asset({owner:msg.sender, plate:plate, uid:chasis, chasis:chasis, engine:engine, v_type:v_type, v_make:v_make});
        if(!allAssets[chasis].initialized){
            allAssets[chasis] = Asset({owner:msg.sender, plate:plate, uid:chasis, chasis:chasis, engine:engine, v_type:v_type, v_make:v_make, initialized:true});
            assetList.push(chasis);
            transferedTo[chasis] = msg.sender;
            tx_count++;
        }
    }

    function transferAsset(address recipient, bytes32 asset_uid) public{
        if(allAssets[asset_uid].initialized && allAssets[asset_uid].owner == msg.sender){
            transferedFrom[asset_uid] = msg.sender;
            transferedTo[asset_uid] = recipient;
            allAssets[asset_uid].owner = recipient;
            // tx_list.push(Transaction({to:recipient, from:msg.sender, tstamp: "hdfgfdg"}));
            tx_count++;
        }
    }

    function getAsset(bytes32 uid) public constant returns (address, bytes32, bytes32, bytes32, bytes32){
        return (allAssets[uid].owner, allAssets[uid].plate, allAssets[uid].engine, allAssets[uid].v_type, allAssets[uid].v_make);
    }

    function getAllAsset() public constant returns (bytes32[]){
        return assetList;
    }

    function ownerOfAsset(bytes32 uid) public constant returns (address){
        return transferedTo[uid];
    }

    function auditAsset(bytes32 uid) public constant returns (address, address){
        return (transferedFrom[uid], transferedTo[uid]);
    }
}