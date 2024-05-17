// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrate {
    address public owner;

    constructor()  {
        owner = msg.sender;
    }

    function migrateFunds(address payable newOwner) public {
        require(msg.sender == owner, "Only owner can migrate funds");
        selfdestruct(newOwner);
    }
}
