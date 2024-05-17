const DNSContract = artifacts.require("DNSContract");
const Migrate = artifacts.require("Migrate");

module.exports = async function(deployer) {
  const registrationFee = web3.utils.toWei('0.1', 'ether'); 
  await deployer.deploy(DNSContract, registrationFee);
  await deployer.deploy(Migrate);
};
