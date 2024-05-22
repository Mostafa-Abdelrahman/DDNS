DNSContract
This Solidity smart contract allows for the registration, updating, transfer, and deletion of domain names on the Ethereum blockchain. The contract enforces ownership and ensures that only the owner of a domain can perform certain actions on it.

Features
Domain Registration: Register a new domain by paying a registration fee.
Domain Information: Retrieve information about a registered domain.
Domain Update: Update the IP address of a registered domain.
Domain Transfer: Transfer ownership of a domain to another address.
Domain Deletion: Delete a registered domain.
Get All Domains: Retrieve a list of all registered domains.
Registration Fee: View the current registration fee.
Contract Details
Solidity Version: 0.8.13
License: MIT
Installation
To deploy and interact with the DNSContract, follow these steps:

Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/DNSContract.git
cd DNSContract
Install Dependencies:
Ensure you have Node.js and npm installed, then run:

bash
Copy code
npm install
Compile the Contract:
Use a Solidity compiler like Remix or Hardhat to compile the contract.

Deploy the Contract:
Deploy the contract to your preferred Ethereum network. For example, using Hardhat:

bash
Copy code
npx hardhat run scripts/deploy.js --network yourNetwork
Usage
Contract Methods
buyDomain: Register a new domain.

solidity
Copy code
function buyDomain(string calldata domain, string calldata ip) external payable
Parameters:

domain: The domain name to register.
ip: The IP address associated with the domain.
getDomainInfo: Retrieve information about a registered domain.

solidity
Copy code
function getDomainInfo(string calldata domain) external view returns (bool, address, string memory, uint256)
Parameters:

domain: The domain name to query.
updateDomain: Update the IP address of a registered domain.

solidity
Copy code
function updateDomain(string calldata domain, string calldata newIP) external
Parameters:

domain: The domain name to update.
newIP: The new IP address for the domain.
transferDomain: Transfer ownership of a domain to another address.

solidity
Copy code
function transferDomain(string calldata domain, address newOwner) external
Parameters:

domain: The domain name to transfer.
newOwner: The address of the new owner.
deleteDomain: Delete a registered domain.

solidity
Copy code
function deleteDomain(string calldata domain) external
Parameters:

domain: The domain name to delete.
getAllDomains: Retrieve a list of all registered domains.

solidity
Copy code
function getAllDomains() external view returns (string[] memory)
getRegistrationFee: View the current registration fee.

solidity
Copy code
function getRegistrationFee() external view returns (uint256)
Events
DomainRegistered: Emitted when a domain is registered.

solidity
Copy code
event DomainRegistered(string domain, address indexed owner);
DomainUpdated: Emitted when a domain's IP address is updated.

solidity
Copy code
event DomainUpdated(string domain, string newIP);
DomainTransferred: Emitted when a domain is transferred to a new owner.

solidity
Copy code
event DomainTransferred(string domain, address indexed newOwner);
DomainDeleted: Emitted when a domain is deleted.

solidity
Copy code
event DomainDeleted(string domain);
License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
Omar ElNily

Acknowledgements
Special thanks to all contributors and the open-source community for their support.

