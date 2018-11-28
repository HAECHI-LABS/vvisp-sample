pragma solidity ^0.4.23;

import './HaechiV1.sol';

contract HaechiGym {
    HaechiV1 haechi;

    function makeFaster() public {
        uint haechiId = haechi.haechiIds(msg.sender);
        haechi.increaseVelocity(haechiId, 10);
    }

    function initialize(address _haechi) public {
        haechi = HaechiV1(_haechi);
    }
}
