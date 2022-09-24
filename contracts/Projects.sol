// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Projects{
    struct Project{
        string name;
        string description;
        uint256 amount;
        uint256 duration;
        address payable owner;
        bool completed;
    }
    
    Project[] public projects;
    
    function createProject(string memory _name, string memory _description, uint256 _amount, uint256 _duration) public{
        Project memory newProject = Project(_name, _description, _amount, _duration, payable(msg.sender), false);
        projects.push(newProject);
    }
    
    function getProjects() public view returns(Project[] memory){
        return projects;
    }

    function getProject(uint256 _index) public view returns(Project memory){
        return projects[_index];
    }

}