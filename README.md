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

GET: api/assets/transactions/
argument: txID

GET: api/assets/trail/
argument: vehicleID

GET: api/assets/
argument: vehicleID

POST: api/assets/new/
send: data{
	plate,
	chasis,
	engine,
	v_type,
	v_make
}
response: String

POST: api/assets/transfer/
send: data{
	plate,
	chasis,
	engine,
	v_type,
	v_make
}
response: String


+ ------------------------USER------------------------
GET: api/users/
response: [
	{
		plate,
		chasis,
		engine,
		v_type,
		v_make
	}
]


GET: api/users/
argument: email

POST: api/users/
send: data{
	email,
	password,
	assets: [
		{vehicleID}
	]
}
response: String


POST: api/users/update/
send: data{
	email,
	password,
	assets: [
		{vehicleID}
	]
}
response: String


