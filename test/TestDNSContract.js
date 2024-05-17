const DNSContract = artifacts.require("DNSContract");

contract("DNSContract", (accounts) => {
  let dnsContract;

  beforeEach(async () => {
    dnsContract = await DNSContract.new(web3.utils.toWei("1", "ether")); // 1 ETH registration fee
  });

  it("should allow buying a domain", async () => {
    await dnsContract.buyDomain("example.com", "192.168.1.1", { from: accounts[0], value: web3.utils.toWei("1", "ether") });
    const domainInfo = await dnsContract.getDomainInfo("example.com");

    const exists = domainInfo[0];
    const owner = domainInfo[1];
    const ip = domainInfo[2];
    const expirationDate = domainInfo[3].toNumber();

    assert.isTrue(exists, "Domain should exist");
    assert.equal(owner, accounts[0], "Owner should be the caller");
    assert.equal(ip, "192.168.1.1", "IP address should match");
    assert.isAbove(expirationDate, 0, "Expiration date should be set");
  });

  it("should allow updating a domain", async () => {
    await dnsContract.buyDomain("example.com", "192.168.1.1", { from: accounts[0], value: web3.utils.toWei("1", "ether") });
    await dnsContract.updateDomain("example.com", "192.168.1.2", { from: accounts[0] });

    const domainInfo = await dnsContract.getDomainInfo("example.com");
    const ip = domainInfo[2];

    assert.equal(ip, "192.168.1.2", "IP address should be updated");
  });

  it("should allow transferring a domain", async () => {
    await dnsContract.buyDomain("example.com", "192.168.1.1", { from: accounts[0], value: web3.utils.toWei("1", "ether") });
    await dnsContract.transferDomain("example.com", accounts[1], { from: accounts[0] });

    const domainInfo = await dnsContract.getDomainInfo("example.com");
    const owner = domainInfo[1];

    assert.equal(owner, accounts[1], "Domain should be transferred to the new owner");
  });

  it("should allow deleting a domain", async () => {
    await dnsContract.buyDomain("example.com", "192.168.1.1", { from: accounts[0], value: web3.utils.toWei("1", "ether") });
    await dnsContract.deleteDomain("example.com", { from: accounts[0] });

    const domainInfo = await dnsContract.getDomainInfo("example.com");
    const exists = domainInfo[0];

    assert.isFalse(exists, "Domain should be deleted");
  });
});
