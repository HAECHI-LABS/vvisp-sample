pragma solidity ^0.4.24;

import './HaechiV1.sol';
import "./interface/IHaechiV2.sol";

contract HaechiV2 is HaechiV1, IHaechiV2 {
    mapping(uint256 => uint256) internal heights_;

    function fly() public {
        uint256 id = haechiIds_[msg.sender];
        require(id != 0, "No registered Haechi");

        uint256 newHeight = heights_[id].add(velocities_[id]);
        heights_[id] = newHeight;

        emit Fly(id, newHeight);
    }

    function heights(uint256 _id) public view returns(uint256) {
        return heights_[_id];
    }
}
