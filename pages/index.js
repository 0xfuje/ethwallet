import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Wallet from '../artifacts/contracts/Wallet.sol/Wallet.json';

const { projectID  } = require('../secrets.json');

const Home = function() {
    const [balance, setBalance] = useState(0);
    const [receive, setReceive] = useState(0);
    const [withdrawAddress, setWithdrawAddress] = useState('0x0000000000000000000000000000000000000000');
    const [sendAmount, setSendAmount] = useState(0);
    const rinkebyAddress = '0x049391EC05379E3C2B7AC9B19B53F7162A95E44D';
    

    const requestAccount = async () => {
        if (typeof window.ethereum === 'undefined') return;
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    requestAccount();

    const getBalance = async () => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(rinkebyAddress, Wallet.abi, provider);
        const balance = await contract.getBalance();
        const balanceInWei = ethers.utils.formatEther(balance);
        setBalance(balanceInWei);
    }

    const receiveETH = async (wei) => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(rinkebyAddress, Wallet.abi, signer);
        const tx = await contract.receiveMoney(wei, {value: wei});
    }

    const sendETH = async (address, wei) => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(rinkebyAddress, Wallet.abi, signer);
        const tx = await contract.withdrawMoneyTo(address, wei);
    }


    
    const handleReceive = () => {
        const receiveBigNum = ethers.utils.parseEther(receive + '');
        receiveETH(receiveBigNum);
    }
    const handleSend = () => {
        const sendBigNum = ethers.utils.parseEther(sendAmount + '');
        sendETH(withdrawAddress, sendBigNum);
    }

    const handleGetBalance = () => getBalance();
    const handleReceiveInputChange = (e) => setReceive(e.target.value);
    const handleWithdrawAddressChange = (e) => setWithdrawAddress(e.target.value);
    const handleSendAmountChange = (e) => setSendAmount(e.target.value);

    return (
        <div className={styles.container}>
            <h1>{balance} ETH</h1>
            <button onClick={handleGetBalance}>Get Balance!</button>
            <br />
            <input type="number" onChange={handleReceiveInputChange} value={receive} />
            <button onClick={handleReceive}>Receive ETH</button>
            <br />
            <input type="text" onChange={handleWithdrawAddressChange} />
            <input type="number" onChange={handleSendAmountChange} />
            <button onClick={handleSend}>Send ETH</button>
        </div>
    )
}

export default Home;