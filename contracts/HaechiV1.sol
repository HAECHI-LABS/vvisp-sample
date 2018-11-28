pragma solidity ^0.4.23;

import './libs/SafeMath.sol';

contract HaechiV1 {
    using SafeMath for uint;

    address public gym;
    mapping(address => uint) public haechiIds;
    mapping(uint => uint) public velocities;
    mapping(uint => uint) public distances;

    modifier onlyGym() {
        require(msg.sender == gym);
        _;
    }

    function initialize(address _gym) public {
        gym = _gym;
    }

    function makeNewHaechi(uint _id) public {
        require(velocities[_id] == 0 && distances[_id] == 0);
        haechiIds[msg.sender] = _id;
        velocities[_id] = 10;
    }

    function run() public {
        uint id = haechiIds[msg.sender];
        distances[id] = distances[id].add(velocities[id]);
    }

    function increaseVelocity(uint _haechiId, uint _diff) onlyGym public {
        velocities[_haechiId] = velocities[_haechiId].add(_diff);
    }
}
