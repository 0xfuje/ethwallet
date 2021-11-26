//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
    uint256 public balanceReceived;
    event Withdraw(address to, uint256 amountInWei);
    event Receive(address from, uint256 amountInWei);

    function receiveMoney(uint256 amount) public payable {
        balanceReceived += amount;
        emit Receive(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawMoney(uint256 amount) public onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function withdrawMoneyTo(address payable _to, uint256 amount)
        public
        onlyOwner
    {
        _to.transfer(amount);
        emit Withdraw(_to, amount);
    }
}
