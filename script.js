const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const abi = [
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
				"internalType": "address",
				"name": "_buyerAddress",
				"type": "address"
			},
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tradeId",
				"type": "uint256"
			}
		],
		"name": "fulfillTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sellerAddress",
				"type": "address"
			}
		],
		"name": "getTradesBySeller",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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

const web3 = new Web3(window.ethereum);

const energyTrading = new web3.eth.Contract(abi, contractAddress);

async function createTrade(buyer, seller, energy, price) {
    const accounts = await web3.eth.getAccounts();
    const result = await energyTrading.methods.createTrade(buyer, seller, energy, price).send({ from: accounts[0] });
    return result;
}

async function getTrade(tradeId) {
    const result = await energyTrading.methods.getTrade(tradeId).call();
    return result;
}

async function getTradesByBuyer(buyerAddress) {
    const result = await energyTrading.methods.getTradesByBuyer(buyerAddress).call();
    return result;
}

async function getTradesBySeller(sellerAddress) {
    const result = await energyTrading.methods.getTradesBySeller(sellerAddress).call();
    return result;
}

function displayTradeDetails(trade) {
    if (!trade) {
        $("#tradeDetails").text("No trade found.");
    } else {
        $("#tradeDetails").html(`<p>ID: ${trade.id}</p><p>Buyer: ${trade.buyer}</p><p>Seller: ${trade.seller}</p><p>Energy: ${trade.energy} kWh</p><p>Price: ${trade.price} wei/kWh</p><p>Status: ${trade.status}</p>`);
    }
}

  // Get the create trade form element
  const createTradeForm = document.getElementById('createTradeForm');

  // Add a submit event listener to the create trade form
  createTradeForm.addEventListener('submit', (event) => {
	  event.preventDefault(); // Prevent the default form submission behavior
	  
	  // Get the form input values
	  const buyer = document.getElementById('buyer').value;
	  const seller = document.getElementById('seller').value;
	  const energy = document.getElementById('energy').value;
	  const price = document.getElementById('price').value;
	  
	  // TODO: Perform any necessary validation of the input values
	  
	  // Call the createTrade function in the smart contract
	  energyTradingContract.methods.createTrade(buyer, seller, energy, price)
		  .send({ from: web3.eth.defaultAccount })
		  .then((result) => {
			  // TODO: Handle the successful trade creation
			  console.log(result);
		  })
		  .catch((error) => {
			  // TODO: Handle the error
			  console.error(error);
		  });
  });
  // Get trades by buyer form
  const getTradesByBuyerForm = document.querySelector('#getTradesByBuyerForm');
  
  getTradesByBuyerForm.addEventListener('submit', async (event) => {
	event.preventDefault();
  
	const buyerAddress = event.target.elements.buyerAddress.value;
  
	const trades = await contract.methods.getTradesByBuyer(buyerAddress).call();
  
	// Display trades
	const tradesList = document.querySelector('#tradesList');
	tradesList.innerHTML = '';
  
	if (trades.length > 0) {
	  trades.forEach((tradeId) => {
		const tradeListItem = document.createElement('li');
		tradeListItem.textContent = `Trade ID: ${tradeId}`;
		tradesList.appendChild(tradeListItem);
	  });
	} else {
	  const noTradesListItem = document.createElement('li');
	  noTradesListItem.textContent = 'No trades found for this buyer';
	  tradesList.appendChild(noTradesListItem);
	}
  });
  // Get the form element
  const getTradeForm = document.getElementById('getTradeForm');
  
  // Add event listener to the form
  getTradeForm.addEventListener('submit', async (event) => {
	  event.preventDefault(); // prevent the default form submission
	  
	  const tradeId = event.target.tradeId.value; // get the value of the tradeId input field
	  
	  // call the smart contract function to get the trade details
	  const trade = await energyTradingContract.methods.getTrade(tradeId).call();
  
	  // display the trade details in the UI
	  const tradeDetails = document.getElementById('tradeDetails');
	  tradeDetails.innerHTML = `
		  <p>Trade ID: ${trade[0]}</p>
		  <p>Buyer: ${trade[1]}</p>
		  <p>Seller: ${trade[2]}</p>
		  <p>Energy amount: ${trade[3]} kWh</p>
		  <p>Price per unit: ${trade[4]} wei/kWh</p>
		  <p>Status: ${trade[5]}</p>
	  `;
  });
  // Get trades by seller form
  const getTradesBySellerForm = document.getElementById("getTradesBySellerForm");
  
  // Add event listener to form submit
  getTradesBySellerForm.addEventListener("submit", async (event) => {
	event.preventDefault(); // Prevent default form submission
	
	const sellerAddress = event.target.sellerAddress.value; // Get seller address from input field
	
	// Call contract function to get trades by seller
	const trades = await energyTradingContract.methods.getTradesBySeller(sellerAddress).call();
	
	// Display trades in a table
	const tradesTable = document.createElement("table");
	const tableHeaderRow = tradesTable.insertRow(0);
	const headerCells = ["Trade ID", "Buyer", "Seller", "Energy (kWh)", "Price (wei/kWh)"];
	for (let i = 0; i < headerCells.length; i++) {
	  const headerCell = document.createElement("th");
	  headerCell.innerText = headerCells[i];
	  tableHeaderRow.appendChild(headerCell);
	}
	
	for (let i = 0; i < trades.length; i++) {
	  const tradeRow = tradesTable.insertRow(i+1);
	  const trade = trades[i];
	  
	  const tradeIdCell = document.createElement("td");
	  tradeIdCell.innerText = trade.tradeId;
	  tradeRow.appendChild(tradeIdCell);
	  
	  const buyerCell = document.createElement("td");
	  buyerCell.innerText = trade.buyer;
	  tradeRow.appendChild(buyerCell);
	  
	  const sellerCell = document.createElement("td");
	  sellerCell.innerText = trade.seller;
	  tradeRow.appendChild(sellerCell);
	  
	  const energyCell = document.createElement("td");
	  energyCell.innerText = trade.energy;
	  tradeRow.appendChild(energyCell);
	  
	  const priceCell = document.createElement("td");
	  priceCell.innerText = trade.price;
	  tradeRow.appendChild(priceCell);
	}
	
	// Add trades table to HTML
	const tradesBySellerSection = document.getElementById("tradesBySellerSection");
	tradesBySellerSection.innerHTML = "";
	tradesBySellerSection.appendChild(tradesTable);
  });
  
  // Get the address of the user
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];
  
  // Get the contract instance
  const energyTradingContract = new web3.eth.Contract(contractAbi, contractAddress);
  
  // Get the user's balance
  const balance = await energyTradingContract.methods.getBalance(userAddress).call();
  
  // Check if the balance is greater than 0
  if (balance > 0) {
	// Call the withdraw function
	await energyTradingContract.methods.withdraw().send({ from: userAddress });
	alert('Funds withdrawn successfully!');
  } else {
	alert('No funds to withdraw.');
  }
  
