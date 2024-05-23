
# DNS Smart Contract Documentation

## Overview

This project is a decentralized domain name service (DNS) implemented on the Ethereum blockchain using Solidity for the smart contract and JavaScript for the API server. The system allows users to register, update and transfer domain names, as well as retrieve domain information. The registration of a domain requires a fee paid in Ether.

## Smart Contract (DNSContract)
### Contract Details
    -Solidity Version: ^0.8.13        
    -License: MIT

### Data Structures
    -Domain: A struct containing:
        -address owner: The owner's address.

        -string ip: The IP address associated with the domain.

        -uint256 expirationDate: The expiration date of the domain registration.
### State Variables
        -mapping(string => Domain) private domains: A mapping of domain names to their details.

        -string[] private domainList: A list of all registered domain names.

        -uint256 private registrationFee: The fee required to register a domain.
### Events
        -DomainRegistered(string domain, address indexed owner): Emitted when a domain is registered.

        -DomainUpdated(string domain, string newIP): Emitted when a domain's IP address is updated.

        -DomainTransferred(string domain, address indexed newOwner): Emitted when a domain is transferred to a new owner.

        -DomainDeleted(string domain): Emitted when a domain is deleted.
### Modifiers
        -onlyDomainOwner(string memory domain): Ensures that the function is only executed by the domain's owner.
### Functions
        -constructor(uint256 fee): Initializes the contract with a specified registration fee.

        -getDomainInfo(string calldata domain) external view returns (bool, address, string memory, uint256): Returns information about a domain.

        -buyDomain(string calldata domain, string calldata ip) external payable: Allows a user to register a new domain.

        -updateDomain(string calldata domain, string calldata newIP) external onlyDomainOwner(domain): Allows the domain owner to update the IP address.

        -transferDomain(string calldata domain, address newOwner) external onlyDomainOwner(domain): Transfers ownership of a domain to a new owner.

        -deleteDomain(string calldata domain) external onlyDomainOwner(domain): Deletes a domain.

        -getAllDomains() external view returns (string[] memory): Returns a list of all registered domains.

        -getRegistrationFee() external view returns (uint256): Returns the registration fee.

## Testing 
### Setup
    Framework: Truffle
    Network: Local Ethereum network (Ganache)
### Tests
        -Buy Domain: Tests the domain registration functionality.
        -Update Domain: Tests the ability to update the IP address of a domain.
        -Transfer Domain: Tests the transfer of domain ownership.
        -Delete Domain: Tests the deletion of a domain.







