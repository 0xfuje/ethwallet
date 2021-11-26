const { messagePrefix } = require("@ethersproject/hash");
const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("Wallet", function () {
  it("Contract should be deployed, balance should equal to 0",
  async function () {
    // 1. Deploy Wallet
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();
    await wallet.deployed();

    // 2. Test if balance equals to 0
    expect(await wallet.getBalance()).to.equal(0);
  });

  it("Contract should receive money and get correct balance",
  async function() {
    // 1. Deploy Wallet
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();
    await wallet.deployed();

    // 2. Fund with 1 ether (10**18)
    await wallet.receiveMoney({value: ethers.utils.parseEther(1 + '')});
    // 3. Test if balance equals 1 ether
    expect(await wallet.getBalance()).to.equal(ethers.utils.parseEther(1 + ''));
  });

  it("Contract owner should be able to withdraw money from the contract",
  async function() {
    // 1. Deploy Wallet
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();
    await wallet.deployed();

    // 2. Fund with 1 ether (10**18)
    await wallet.receiveMoney({value: ethers.utils.parseEther("1")});

    // 3. Withdraw one ether
    await wallet.withdrawMoney(ethers.utils.parseEther("1"));

    // 4. Check remaining balance (0)
    expect(await wallet.getBalance()).to.equal(0);
  });

  it("Contract owner should be able to withdraw money to specified address",
  async function() {
    // 1. Deploy Wallet
    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();
    await wallet.deployed();

    // 2. Fund with 1 ether (10**18)
    await wallet.receiveMoney({value: ethers.utils.parseEther("1")});

    // 3. Withdraw one ether
    await wallet.withdrawMoneyTo('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ethers.utils.parseEther("1"));

    // 4. Check remaining balance (0)
    expect(await wallet.getBalance()).to.equal(0);
  });
  
});
