const StockToken = artifacts.require("./StockToken");

module.exports = function(deployer) {
  deployer.deploy(StockToken);
};
