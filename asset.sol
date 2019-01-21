pragma solidity ^0.4.19;

contract GenericAssetTransfer{
    struct Asset{
        bool initialized;
        string uuid;
        string plate;
        string engine;
        string v_type;
        string v_make;
    }
    
    mapping(string  => Asset) private assetStore;
    mapping(address => mapping(string => bool)) private walletStore;

    // mapping (string => address) public globalTransferedTo;
    // mapping (string => address) public globalTrasnferedFrom;
    
    event AssetCreate(address account, string uuid, string plate, string engine, string v_type, string v_make);
    event RejectCreate(address account, string uuid, string message);
    event AssetTransfer(address from, address to, string uuid);
    event RejectTransfer(address from, address to, string uuid, string message);

    function createAsset(
        string uuid,
        string plate,
        string engine,
        string v_type,
        string v_make
        ) public {
        if(assetStore[uuid].initialized) {
            emit RejectCreate(msg.sender, uuid, "Asset with this UUID already exists.");
            return;
        }
        
        assetStore[uuid] = Asset(true, uuid, plate, engine, v_type, v_make);
        walletStore[msg.sender][uuid] = true;
        emit AssetCreate(msg.sender, uuid, plate, engine, v_type, v_make);
    }

    function transferAsset(address to, string uuid) public {
        if(!assetStore[uuid].initialized) {
            emit RejectTransfer(msg.sender, to, uuid, "No asset with this UUID exists");
            return;
        }
        if(!walletStore[msg.sender][uuid]) {
            emit RejectTransfer(msg.sender, to, uuid, "Sender does not own this asset.");
            return;
        }
        walletStore[msg.sender][uuid] = false;
        walletStore[to][uuid] = true;

        // globalTrasnferedFrom[uuid] = msg.sender;
        // globalTransferedTo[uuid] = to;
        
        emit AssetTransfer(msg.sender, to, uuid);
    }
    
    function getAssetByUUID(string uuid) public view returns (string, string, string, string, string) {
        return (assetStore[uuid].plate, assetStore[uuid].plate, assetStore[uuid].engine, assetStore[uuid].v_type, assetStore[uuid].v_make);
    }
    
    function isOwnerOf(address owner, string uuid) public view returns (bool) {
        if(walletStore[owner][uuid]) {
            return true;
        }
        return false;
    }

    // function assetAuditing(string uuid) public constant returns (address, address){
    //     return(globalTransferedTo[uuid], globalTrasnferedFrom[uuid]);
    // }
}