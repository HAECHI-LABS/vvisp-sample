pragma solidity ^0.4.24;

contract IHaechi {
    event NewHaechi(uint256 id, address owner);
    event Run(uint256 id, uint256 distance);
    event IncreaseVelocity(uint256 id, uint256 velocity);

    function initialize(address _gym) public;

    function makeNewHaechi(uint256 _id) public;

    function run() public;

    function increaseVelocity(uint256 _haechiId, uint256 _diff) public;

    function gym() public view returns(address);

    function haechiIds(address _owner) public view returns(uint256);

    function velocities(uint256 _id) public view returns(uint256);

    function distances(uint256 _id) public view returns(uint256);
}
