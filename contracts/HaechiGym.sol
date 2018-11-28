pragma solidity ^0.4.23;

import './libs/Ownable.sol';
import './libs/SafeMath.sol';
import './HaechiV1.sol';

contract HaechiGym is Ownable {
    using SafeMath for uint;

    function makeFaster(address _haechi) public {
        HaechiV1(_haechi).increaseVelocity(10);
    }
}
