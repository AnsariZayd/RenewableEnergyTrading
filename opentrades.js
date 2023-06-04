// Retrieve the trades from local storage
let trades = JSON.parse(localStorage.getItem('trades')) || [];

// Populate the open trades table
const openTradesTableBody = document.getElementById('open-trades-table-body');

function displayOpenTrades() {
  // Clear existing table rows
  openTradesTableBody.innerHTML = '';

  // Loop through the trades array and create table rows
  for (const trade of trades) {
    const row = document.createElement('tr');

    const tradeIdCell = document.createElement('td');
    tradeIdCell.textContent = trade.tradeId;
    row.appendChild(tradeIdCell);

    const buyerAddressCell = document.createElement('td');
    // Add buyer address here, assuming it's stored somewhere
    // e.g. trade.buyerAddress;
    buyerAddressCell.textContent = 'N/A';
    row.appendChild(buyerAddressCell);

    const sellerAddressCell = document.createElement('td');
    sellerAddressCell.textContent = trade.sellerAddress;
    row.appendChild(sellerAddressCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = trade.amount;
    row.appendChild(amountCell);

    const pricePerUnitCell = document.createElement('td');
    pricePerUnitCell.textContent = trade.pricePerUnit;
    row.appendChild(pricePerUnitCell);

    const fulfilledCell = document.createElement('td');
    fulfilledCell.textContent = trade.fulfilled ? 'Yes' : 'No';
    row.appendChild(fulfilledCell);

    const actionCell = document.createElement('td');
    const fulfillButton = document.createElement('button');
    fulfillButton.textContent = 'Fulfill';
    fulfillButton.addEventListener('click', function() {
      fulfillTrade(trade.tradeId);
    });
    actionCell.appendChild(fulfillButton);
    row.appendChild(actionCell);

    openTradesTableBody.appendChild(row);
  }
}

// Call the function to display open trades when the page loads
displayOpenTrades();

// Function to fulfill a trade
function fulfillTrade(tradeId) {
  // Find the trade with the matching tradeId in the trades array
  const trade = trades.find(t => t.tradeId === tradeId);
  if (trade) {
    // Set fulfilled status to true
    trade.fulfilled = true;
    // Update the table
    displayOpenTrades();
  }
}
