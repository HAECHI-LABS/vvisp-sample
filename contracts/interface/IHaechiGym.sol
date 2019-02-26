pragma solidity ^0.4.24;

contract IHaechiGym {
    function makeFaster() public;

    function setHaechiContract(address _haechi) public;

    function haechi() public view returns(address);
}
