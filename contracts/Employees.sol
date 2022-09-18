// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Employees {
    enum EmployeeStatus {AVAILABEL, UNAVAILABEL}

    struct Employee {
        string name;
        string[] skills;
        uint rating;
        string avatarHash;
        address owner;
        EmployeeStatus status;
    }

    Employee[] public employees;
    mapping (address => Employee) public employeeByOwner;

    function createEmployee(
        string memory _name,
        string[] memory _skills,
        uint _rating,
        string memory _avatarHash
    ) public {
        Employee memory newEmployee = Employee({
            name: _name,
            skills: _skills,
            rating: _rating,
            avatarHash: _avatarHash,
            owner: msg.sender,
            status: EmployeeStatus.AVAILABEL
        });

        employees.push(newEmployee);
    }

    function getEmployees() public view returns (Employee[] memory) {
        return employees;
    }

    function getEmployee(uint _index) public view returns (Employee memory) {
        return employees[_index];
    }

    function getEmployeeCount() public view returns (uint) {
        return employees.length;
    }

    function updateEmployeeStatus(uint _index, EmployeeStatus _status) public {
        employees[_index].status = _status;
    }

    function updateEmployeeRating(uint _index, uint _rating) public {
        employees[_index].rating = _rating;
    }

    function updateEmployeeAvatarHash(uint _index, string memory _avatarHash) public {
        employees[_index].avatarHash = _avatarHash;
    }

    function updateEmployeeSkills(uint _index, string[] memory _skills) public {
        employees[_index].skills = _skills;
    }

    function updateEmployeeName(uint _index, string memory _name) public {
        employees[_index].name = _name;
    }

    function deleteEmployee(uint _index) public {
        delete employees[_index];
    }
}