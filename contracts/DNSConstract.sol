// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DNSContract {
    struct Domain {
        address owner;
        string ip;
        uint256 expirationDate;
    }

    mapping(string => Domain) private domains;
    string[] private domainList;
    uint256 private registrationFee;

    event DomainRegistered(string domain, address indexed owner);
    event DomainUpdated(string domain, string newIP);
    event DomainTransferred(string domain, address indexed newOwner);
    event DomainDeleted(string domain);

    constructor(uint256 fee) {
        registrationFee = fee;
    }

    modifier onlyDomainOwner(string memory domain) {
        require(
            domains[domain].owner == msg.sender,
            "You are not the owner of this domain name"
        );
        _;
    }

    function getDomainInfo(string calldata domain) external view returns (bool, address, string memory, uint256) {
        Domain memory d = domains[domain];
        return (d.owner != address(0), d.owner, d.ip, d.expirationDate);
    }

    function buyDomain(string calldata domain, string calldata ip) external payable {
        require(msg.value >= registrationFee, "Insufficient payment for domain registration");
        require(domains[domain].owner == address(0), "This domain already exists");

        uint256 expirationDate = block.timestamp + 365 days;

        domains[domain] = Domain({
            owner: msg.sender,
            ip: ip,
            expirationDate: expirationDate
        });

        domainList.push(domain);

        emit DomainRegistered(domain, msg.sender);
    }

    function updateDomain(string calldata domain, string calldata newIP) external onlyDomainOwner(domain) {
        domains[domain].ip = newIP;
        emit DomainUpdated(domain, newIP);
    }

    function transferDomain(string calldata domain, address newOwner) external onlyDomainOwner(domain) {
        require(newOwner != address(0), "Invalid address for domain transfer");
        domains[domain].owner = newOwner;
        emit DomainTransferred(domain, newOwner);
    }

    function deleteDomain(string calldata domain) external onlyDomainOwner(domain) {
        delete domains[domain];

        for (uint256 i = 0; i < domainList.length; i++) {
            if (keccak256(bytes(domainList[i])) == keccak256(bytes(domain))) {
                domainList[i] = domainList[domainList.length - 1];
                domainList.pop();
                break;
            }
        }

        emit DomainDeleted(domain);
    }

    function getAllDomains() external view returns (string[] memory) {
        return domainList;
    }

    function getRegistrationFee() external view returns (uint256) {
        return registrationFee;
    }
}
