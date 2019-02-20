pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./interface/IHaechiV1.sol";

contract HaechiV1 is IHaechiV1 {
    using SafeMath for uint256;

    uint256 constant INITIAL_VELOCITY = 10;

    address internal gym_;
    mapping(address => uint256) internal haechiIds_;
    mapping(uint256 => uint256) internal velocities_;
    mapping(uint256 => uint256) internal distances_;

    bool private isInitialized = false;

    modifier onlyGym() {
        require(msg.sender == gym_);
        _;
    }

    function initialize(address _gym) public {
        require(_gym != address(0), "Zero address is invalid");
        require(isInitialized == false, "Already Initialized");
        gym_ = _gym;
        isInitialized = true;
    }

    function makeNewHaechi(uint256 _id) public {
        require(velocities_[_id] == 0 && distances_[_id] == 0, "Duplicated id");
        haechiIds_[msg.sender] = _id;
        velocities_[_id] = INITIAL_VELOCITY;
        emit NewHaechi(_id, velocities_[_id]);
    }

    function run() public {
        uint256 id = haechiIds_[msg.sender];
        distances_[id] = distances_[id].add(velocities_[id]);
        emit Run(id, distances_[id]);
    }

    function increaseVelocity(uint256 _haechiId, uint256 _diff) onlyGym public {
        velocities_[_haechiId] = velocities_[_haechiId].add(_diff);
        emit IncreaseVelocity(_haechiId, velocities_[_haechiId]);
    }

    function gym() public view returns(address) {
        return gym_;
    }

    function haechiIds(address _owner) public view returns(uint256) {
        return haechiIds_[_owner];
    }

    function velocities(uint256 _id) public view returns(uint256) {
        return velocities_[_id];
    }

    function distances(uint256 _id) public view returns(uint256) {
        return distances_[_id];
    }
}
