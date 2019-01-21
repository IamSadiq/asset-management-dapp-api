// create new asset
// contractInstance.newAsset('G6-UPORT80', 'KFVE663GC9388FFOP7O0kLKjja9', 'TYG0754666GKK', 'Coupe', 'Bugatti', {from: web3.eth.accounts[6], gas: 4700000});
contractInstance.newAsset('OOPE883GC0419FFOP7O0kLCDNHY', 'DDBC088666LAA', 'Limo', 'Maybach', (new Date()).toString(), {from: web3.eth.accounts[4], gas: 4700000});

// get particular asset
contractInstance.getAsset.call('KFVE663GC9388FFOP7O0kLKjja9').toLocaleString();
contractInstance.getAsset.call('OOPE883GC0419FFOP7O0kLCDNHY').toLocaleString();

// get all assets
// contractInstance.getAllAsset.call().toLocaleString();

//transfer asset ownership
// contractInstance.transferAsset('0x13860758f94685a8f916a0a8bcd36ed20f48d919', 'KFVE663GC9388FFOP7O0kLKjja9', {from: web3.eth.accounts[6], gas: 4700000});
contractInstance.transferAsset(web3.eth.accounts[3], 'OOPE883GC0419FFOP7O0kLCDNHY', (new Date()).toString(), {from: web3.eth.accounts[6], gas: 4700000});


//OwnerOf Asset
// contractInstance.ownerOfAsset.call('KFVE663GC9388FFOP7O0kLKjja9').toLocaleString();
contractInstance.getTransactionCount.call('OOPE883GC0419FFOP7O0kLCDNHY').toLocaleString();

//Audit Asset
// contractInstance.auditAsset.call('KFVE663GC9388FFOP7O0kLKjja9').toLocaleString();
contractInstance.getVehicleTrail.call('OOPE883GC0419FFOP7O0kLCDNHY', 0).toLocaleString();