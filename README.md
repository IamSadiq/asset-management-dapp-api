# Decentralized Asset Management 
+ This is a service for an Asset Management Project on the blockchain with initial focus on vehicles.
+ With Ethereum as the blockchain in use.

# Contributing
+ This project is open to contributors
+ The smart contract is written in solidity

# Features
+ Create Asset: Create and register asset to an owner
+ Transfer Asset: Transfer asset ownership from old to new owner
+ Get Asset Trail: Auditing of asset to track ownership since asset creation
+ Get Asset Transaction Counts
+ Get Asset details

# Endpoints || Routes

+ ---------------ASSETS---------------------

## Get Asset Transaction By Id

verb: GET

route: api/assets/transactions/

request param : txID


## Get Asset Trail By Id

verb: GET

route: api/assets/trail/

request param: vehicleID


## Get Asset By Id

verb: GET

route: api/assets/

request param: vehicleID


## Create New Asset

verb: POST

route: api/assets/new/

request param (payload): {
	plate,
	chasis,
	engine,
	v_type,
	v_make
}

response: String


## Transfer Asset

verb: POST

route: api/assets/transfer/

request param (payload): {
	plate,
	chasis,
	engine,
	v_type,
	v_make
}

response: String


+ ------------------------USER------------------------

## Get Users

verb: GET

route: api/users/

response: [
	{
		plate,
		chasis,
		engine,
		v_type,
		v_make
	}
]


## Get User By Email

verb: GET

route: api/users/

request param: email


## Create User

verb: POST

route: api/users/

payload: data{
	email,
	password,
	assets: [
		{vehicleID}
	]
}

response: String


## Update User

verb: POST

route: api/users/update/

payload: data{
	email,
	password,
	assets: [
		{vehicleID}
	]
}

response: String
