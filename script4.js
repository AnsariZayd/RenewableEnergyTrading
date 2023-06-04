const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tradeId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerUnit",
				"type": "uint256"
			}
		],
		"name": "TradeCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tradeId",
				"type": "uint256"
			}
		],
		"name": "TradeFulfilled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tradeId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_buyerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerUnit",
				"type": "uint256"
			}
		],
		"name": "buyTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sellerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerUnit",
				"type": "uint256"
			}
		],
		"name": "createTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyTrades",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyerAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "sellerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pricePerUnit",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "fulfilled",
						"type": "bool"
					}
				],
				"internalType": "struct EnergyTrading.Trade[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tradeId",
				"type": "uint256"
			}
		],
		"name": "getTrade",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_buyerAddress",
				"type": "address"
			}
		],
		"name": "getTradesByBuyer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyerAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "sellerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pricePerUnit",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "fulfilled",
						"type": "bool"
					}
				],
				"internalType": "struct EnergyTrading.Trade[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tradeCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "trades",
		"outputs": [
			{
				"internalType": "address",
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pricePerUnit",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "fulfilled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
 // Replace [...] with the ABI of your smart contract
const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138' // Replace '0x...' with the address of your smart contract
