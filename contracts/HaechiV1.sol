pragma solidity ^0.4.23;

import './libs/Ownable.sol';
import './libs/SafeMath.sol';

contract HaechiV1 is Ownable {
    using SafeMath for uint;

    uint public velocity = 100;
    uint public distance = 0;
    address public gym;

    modifier onlyGym() {
        require(msg.sender == gym);
        _;
    }

    function initialize(address _owner, address _gym) public {
        setOwner(_owner);
        gym = _gym;
    }

    function run() onlyOwner public {
        distance = distance.add(velocity);
    }

    function increaseVelocity(uint _diff) onlyGym public {
        velocity = velocity.add(_diff);
    }
}
