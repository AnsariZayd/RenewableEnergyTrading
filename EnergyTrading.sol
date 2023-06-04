// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
    struct Trade {
        address buyerAddress;
        address sellerAddress;
        uint256 amount;
        uint256 pricePerUnit;
        bool fulfilled;
    }
    
    mapping(uint256 => Trade) public trades;
    uint256 public tradeCounter;
    
    event TradeCreated(
        uint256 indexed tradeId,
        address indexed buyerAddress,
        address indexed sellerAddress,
        uint256 amount,
        uint256 pricePerUnit
    );
    
    event TradeFulfilled(uint256 indexed tradeId);
    
    function createTrade(
        address _sellerAddress,
        uint256 _amount,
        uint256 _pricePerUnit
    ) external {
        require(_sellerAddress != address(0), "Invalid seller address");
        require(_amount > 0, "Invalid amount");
        require(_pricePerUnit > 0, "Invalid price per unit");
        
        uint256 tradeId = tradeCounter++;
        trades[tradeId] = Trade({
            buyerAddress: address(0),
            sellerAddress: _sellerAddress,
            amount: _amount,
            pricePerUnit: _pricePerUnit,
            fulfilled: false
        });
        
        emit TradeCreated(tradeId, address(0), _sellerAddress, _amount, _pricePerUnit);
    }
    
    function buyTrade(
        uint256 _tradeId,
        address _buyerAddress,
        uint256 _amount,
        uint256 _pricePerUnit
    ) external {
        require(_buyerAddress != address(0), "Invalid buyer address");
        require(_amount > 0, "Invalid amount");
        require(_pricePerUnit > 0, "Invalid price per unit");
        
        Trade storage trade = trades[_tradeId];
        require(trade.sellerAddress != address(0), "Trade does not exist");
        require(!trade.fulfilled, "Trade already fulfilled");
        require(trade.buyerAddress == address(0), "Trade already has a buyer");
        require(_amount == trade.amount, "Amount mismatch");
        require(_pricePerUnit == trade.pricePerUnit, "Price per unit mismatch");
        
        trade.buyerAddress = _buyerAddress;
        trade.fulfilled = true;
        
        emit TradeFulfilled(_tradeId);
    }
    
     function getTrade(uint256 _tradeId)
        external
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            bool
        )
    {
        require(trades[_tradeId].sellerAddress != address(0), "Trade does not exist");
        return (
            trades[_tradeId].buyerAddress,
            trades[_tradeId].sellerAddress,
            trades[_tradeId].amount,
            trades[_tradeId].pricePerUnit,
            trades[_tradeId].fulfilled
        );
    }

    
    function getTradesByBuyer(address _buyerAddress) external view returns (Trade[] memory) {
        require(_buyerAddress != address(0), "Invalid buyer address");
        
        uint256[] memory tradeIds = getTradesByBuyerIds(_buyerAddress);
        Trade[] memory result = new Trade[](tradeIds.length);
        
        for (uint256 i = 0; i < tradeIds.length; i++) {
            uint256 tradeId = tradeIds[i];
            result[i] = trades[tradeId];
        }
        
        return result;
    }
    
    function getMyTrades() external view returns (Trade[] memory) {
        uint256[] memory tradeIds = getMyTradesIds();
       
        Trade[] memory result = new Trade[](tradeIds.length);

        for (uint256 i = 0; i < tradeIds.length; i++) {
            uint256 tradeId = tradeIds[i];
            result[i] = trades[tradeId];
        }

        return result;
    }

    function getTradesByBuyerIds(address _buyerAddress) internal view returns (uint256[] memory) {
        uint256[] memory tradeIds = new uint256[](tradeCounter);
        uint256 count = 0;
        for (uint256 i = 0; i < tradeCounter; i++) {
            Trade memory trade = trades[i];
            if (trade.buyerAddress == _buyerAddress) {
                tradeIds[count] = i;
                count++;
            }
        }
        return tradeIds;
    }

    function getMyTradesIds() internal view returns (uint256[] memory) {
        uint256[] memory tradeIds = new uint256[](tradeCounter);
        uint256 count = 0;
        for (uint256 i = 0; i < tradeCounter; i++) {
            Trade memory trade = trades[i];
            if (trade.buyerAddress == msg.sender || trade.sellerAddress == msg.sender) {
                tradeIds[count] = i;
                count++;
            }
        }
        return tradeIds;
    }
}
