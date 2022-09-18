// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Employers {
    struct Employer {
        string name;
        string avatarHash;
        address owner;
    }

    Employer[] public employers;
    mapping (address => Employer) public employerByOwner;

    function createEmployer(string memory _name, string memory _avatarHash) public {
        Employer memory newEmployer = Employer({
            name: _name,
            avatarHash: _avatarHash,
            owner: msg.sender
        });

        employers.push(newEmployer);
    }

    function getEmployers() public view returns (Employer[] memory) {
        return employers;
    }

    function getEmployer(uint _index) public view returns (Employer memory) {
        return employers[_index];
    }

    function getEmployerCount() public view returns (uint) {
        return employers.length;
    }

    function updateEmployerAvatarHash(uint _index, string memory _avatarHash) public {
        employers[_index].avatarHash = _avatarHash;
    }

    function updateEmployerName(uint _index, string memory _name) public {
        employers[_index].name = _name;
    }


}