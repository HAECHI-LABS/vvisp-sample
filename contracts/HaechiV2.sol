pragma solidity ^0.4.23;

import './HaechiV1.sol';

contract HaechiV2 is HaechiV1 {
    uint public height = 0;

    function fly() onlyOwner public {
        height = height.add(velocity);
    }
}
