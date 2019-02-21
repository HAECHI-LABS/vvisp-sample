pragma solidity ^0.4.24;

import './interface/IHaechiV1.sol';
import "./interface/IHaechiGym.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract HaechiGym is Ownable, IHaechiGym {
    IHaechiV1 internal haechi_;

    function makeFaster() public {
        uint256 haechiId = haechi_.haechiIds(msg.sender);
        haechi_.increaseVelocity(haechiId, 10);
    }

    function setHaechiContract(address _haechi) public onlyOwner {
        require(_haechi != address(0), "Zero address is invalid");

        haechi_ = IHaechiV1(_haechi);
    }

    function haechi() public view returns(address) {
        return address(haechi_);
    }
}
