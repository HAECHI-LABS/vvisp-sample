pragma solidity ^0.4.24;

import './interface/IHaechiV1.sol';
import "./interface/IHaechiGym.sol";

contract HaechiGym is IHaechiGym {
    IHaechiV1 internal haechi_;

    bool isInitialized = false;

    function makeFaster() public {
        uint256 haechiId = haechi_.haechiIds(msg.sender);
        haechi_.increaseVelocity(haechiId, 10);
    }

    function initialize(address _haechi) public {
        require(!isInitialized, "Already Initialized");
        require(_haechi != address(0), "Zero address is invalid");

        haechi_ = IHaechiV1(_haechi);
        isInitialized = true;
    }

    function haechi() public view returns(address) {
        return address(haechi_);
    }
}
