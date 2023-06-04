const web3 = new Web3(Web3.givenProvider || "http://192.168.0.102:8080/");
const energyTradingContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Function to create a new trade
function createTrade() {
  // Get form data
  var sellerAddress = document.getElementById('seller-address').value;
  var amount = document.getElementById('amount').value;
  var pricePerUnit = document.getElementById('price-per-unit').value;

  // Validate form data
  if (sellerAddress === '' || amount === '' || pricePerUnit === '') {
    alert('Please fill in all the fields');
    return;
  }

  // Add trade to open trades table
  var tradeId = Date.now(); // Generate unique trade ID
  var row = document.createElement('tr');
  row.id = `trade-row-${tradeId}`; // Set row ID for future reference
  row.innerHTML = `<td>${tradeId}</td><td>-</td><td>${sellerAddress}</td><td>${amount}</td><td>${pricePerUnit}</td><td>No</td><td><button type="button" onclick="fulfillTrade(${tradeId})" style="background-color: #635ce4; color: #ffffff; border: none; padding: 10px 10px; border-radius: 5px; cursor: pointer; ;">BUY</button></td>`;

  document.getElementById('open-trades-table-body').appendChild(row);

  // Clear form fields
  document.getElementById('seller-address').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('price-per-unit').value = '';
}

function fulfillTrade(tradeId) {
  // Get the trade row element
  const tradeRow = document.getElementById(`trade-row-${tradeId}`);

  // Check if the trade row element exists
  if (!tradeRow) {
    alert(`Trade ID ${tradeId} not found`);
    return;
  }

  // Get the trade details from the trade row
  const sellerAddress = tradeRow.cells[2].textContent;
  const amount = tradeRow.cells[3].textContent;
  const pricePerUnit = tradeRow.cells[4].textContent;

  // Get the current user's address from MetaMask (assuming MetaMask is being used as the web3 provider)
  web3.eth.getAccounts()
    .then(accounts => {
      const buyerAddress = accounts[0]; // Assuming the first account is the current user's address
      // Prompt the user to confirm the payment with MetaMask
      const weiAmount = web3.utils.toWei(amount, 'gwei'); // Convert amount to gwei (minimum unit)
      const weiPricePerUnit = web3.utils.toWei(pricePerUnit, 'gwei'); // Convert pricePerUnit to gwei (minimum unit)
      const totalPrice = web3.utils.toBN(weiAmount).mul(web3.utils.toBN(weiPricePerUnit)); // Calculate total price in wei
      const gasPrice = web3.utils.toWei('20', 'gwei'); // Set gas price to 20 gwei (minimum unit)

      web3.eth.sendTransaction({
        from: buyerAddress,
        to: sellerAddress,
        value: totalPrice.toString(),
        gasPrice: gasPrice,
      })
        .on('transactionHash', function (hash) {
          // Transaction hash callback (optional)
          console.log(`Transaction hash: ${hash}`);
        })
        .on('receipt', function (receipt) {
          // Transaction receipt callback
          console.log(`Transaction receipt:`, receipt);

                    // Perform the trade fulfillment logic
          // Example implementation (for demonstration purposes only)
          // Here, we assume that the trade is successfully fulfilled and mark it as fulfilled
          const fulfilledCell = tradeRow.cells[5];
          fulfilledCell.textContent = 'Yes';

          // Remove the trade from open trades table
          tradeRow.remove();

          // Add the trade to my trades table
          var myTradesTable = document.getElementById('my-trades-table-body');
          var myTradesRow = document.createElement('tr');
          myTradesRow.innerHTML = `<td>${tradeId}</td><td>${buyerAddress}</td><td>${sellerAddress}</td><td>${amount}</td><td>${pricePerUnit}</td><td>Yes</td>`;
          myTradesTable.appendChild(myTradesRow);

          // Display success message
          alert(`Trade ID ${tradeId} has been successfully fulfilled!`);
        })
        .on('error', function (error) {
          // Transaction error callback
          console.error(`Transaction error:`, error);
          alert(`Failed to fulfill trade ID ${tradeId}. Please check the console for details.`);
        });
    })
    .catch(error => {
      // Error getting current user's address from MetaMask
      console.error(`Failed to get current user's address:`, error);
      alert(`Failed to fulfill trade ID ${tradeId}. Please check the console for details.`);
    });
}

async function getTrade() {
  let tradeId = document.getElementById("tradeIdInput").value;
  let tradeDetails = await energyTradingContract.methods.getTrade(tradeId).call();
  let tradeDetailsElement = document.getElementById("tradeDetails");
  tradeDetailsElement.innerHTML = `
    <p>Buyer Address: ${tradeDetails[0]}</p>
    <p>Seller Address: ${tradeDetails[1]}</p>
    <p>Amount: ${tradeDetails[2]}</p>
    <p>Price Per Unit: ${tradeDetails[3]}</p>
    <p>Fulfilled: ${tradeDetails[4]}</p>
  `;
}

async function getTradesByBuyer() {
  let buyerAddress = document.getElementById("buyerInput").value;
  let tradeIds = await energyTradingContract.methods.getTradesByBuyer(buyerAddress).call();
  let tradeDetailsElement = document.getElementById("tradeDetails");
  tradeDetailsElement.innerHTML = "";
  for (let i = 0; i < tradeIds.length; i++) {
    let tradeId = tradeIds[i];
    let tradeDetails = await energyTradingContract.methods.getTrade(tradeId).call();
    tradeDetailsElement.innerHTML += `
      <h3>Trade ID: ${tradeId}</h3>
      <p>Buyer Address: ${tradeDetails[0]}</p>
      <p>Seller Address: ${tradeDetails[1]}</p>
      <p>Amount: ${tradeDetails[2]}</p>
      <p>Price Per Unit: ${tradeDetails[3]}</p>
      <p>Fulfilled: ${tradeDetails[4]}</p>
    `;
  }
}

async function getTradesBySeller() {
  let sellerAddress = document.getElementById("sellerInput").value;
  let tradeIds = await energyTradingContract.methods.getMyTradesIds().call({from: sellerAddress});
  let tradeDetailsElement = document.getElementById("tradeDetails");
  tradeDetailsElement.innerHTML = "";
  for (let i = 0; i < tradeIds.length; i++) {
    let tradeId = tradeIds[i];
    let tradeDetails = await energyTradingContract.methods.getTrade(tradeId).call();
    tradeDetailsElement.innerHTML += `
      <h3>Trade ID: ${tradeId}</h3>
      <p>Buyer Address: ${tradeDetails[0]}</p>
      <p>Seller Address: ${tradeDetails[1]}</p>
      <p>Amount: ${tradeDetails[2]}</p>
      <p>Price Per Unit: ${tradeDetails[3]}</p>
      <p>Fulfilled: ${tradeDetails[4]}</p>
    `;
  }
}
