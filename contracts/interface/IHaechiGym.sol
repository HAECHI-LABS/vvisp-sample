pragma solidity ^0.4.24;

contract IHaechiGym {
    function makeFaster() public;

    function initialize(address _newOwner, address _haechi) public;

    function setHaechiContract(address _haechi) public;

    function haechi() public view returns(address);
}
