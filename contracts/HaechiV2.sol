pragma solidity ^0.4.23;

import './HaechiV1.sol';

contract HaechiV2 is HaechiV1 {
    mapping(uint => uint) public heights;

    function fly() public {
        uint id = haechiIds[msg.sender];
        heights[id] = heights[id].add(velocities[id]);
    }
}
