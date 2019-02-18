pragma solidity ^0.4.24;

contract IHaechiV2 {
    event Fly(uint256 id, uint256 height);

    function fly() public;

    function heights(uint256 _id) public view returns(uint256);
}
