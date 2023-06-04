// check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  
  // connect to MetaMask
  async function connect() {
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Redirect to the next page
      window.location.href = './index.html';
    } catch (error) {
      // User denied account access...
      console.error(error);
    }
  }
  