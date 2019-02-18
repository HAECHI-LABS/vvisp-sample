pragma solidity ^0.4.24;

import './HaechiV1.sol';
import "./interface/IHaechiV2.sol";

contract HaechiV2 is HaechiV1, IHaechiV2 {
    mapping(uint256 => uint256) internal heights_;

    function fly() public {
        uint256 id = haechiIds_[msg.sender];
        heights_[id] = heights_[id].add(velocities_[id]);
        emit Fly(id, heights_[id]);
    }

    function heights(uint256 _id) public view returns(uint256) {
        return heights_[_id];
    }
}
