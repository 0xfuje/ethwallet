import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import Wallet from '../artifacts/contracts/Wallet.sol/Wallet.json';
import logo from '../public/eth-logo.png';

const Home = function() {
    const [balanceETH, setBalanceETH] = useState(0);
    const [balanceUSD, setBalanceUSD] = useState(0);
    const [receive, setReceive] = useState(0);
    const [withdrawAddress, setWithdrawAddress] = useState('0x0000000000000000000000000000000000000000');
    const [sendAmount, setSendAmount] = useState(0);
    const rinkebyWalletAddress = '0xF5Ba7438E71c360A57193E9874f5bC464BaF2f3E';
    

    const requestAccount = async () => {
        if (typeof window.ethereum === 'undefined') return;
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    requestAccount();

    useEffect(() => {
        getBalance();
    }, []);

    const getBalance = async () => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(rinkebyWalletAddress, Wallet.abi, provider);
        const balance = await contract.getBalance();
        const balanceInETH = ethers.utils.formatEther(balance);
        setBalanceETH(balanceInETH);
        const ethPrice = await contract.getBalanceInUSD();
        const balanceInUSD = ((balanceInETH * ethPrice) / 10 ** 8).toFixed(2);
        setBalanceUSD(balanceInUSD);
    }

    const receiveETH = async (wei) => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(rinkebyWalletAddress, Wallet.abi, signer);
        const tx = await contract.receiveMoney(wei, {value: wei});
    }

    const sendETH = async (address, wei) => {
        if (typeof window.ethereum === 'undefined') return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(rinkebyWalletAddress, Wallet.abi, signer);
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
            <div className={styles.wallet}>
                <h1 className={styles.title}>eth wallet</h1>
            <div className={styles.balance}>
                <div className={styles.balanceLeft}>
                    <Image className={styles.image} width='32px' height='32px' src={logo} alt='Ethereum logo logo'/>
                    <h1>Ethereum <span>ETH</span></h1>
                </div>
                <div className={styles.balanceRight}>
                    <h1>{balanceETH} ETH</h1>
                    <span>{balanceUSD} USD</span>
                </div>
            </div>
            <div className={styles.receive}>
                <input className={styles.input} type="number" onChange={handleReceiveInputChange} value={receive} />
                <button className={styles.button} onClick={handleReceive}>Receive ETH</button>
            </div>
            <div className={styles.send}>
                <div className={styles.sendUpper}>
                    <input className={styles.input} type="number" onChange={handleSendAmountChange} />
                    <button className={styles.button} onClick={handleSend}>Send ETH</button>
                </div>
                <input className={`${styles.input} ${styles.inputLarge}`}
                placeholder='copy in rinkeby address' type="text" onChange={handleWithdrawAddressChange} />
            </div>
            </div>
            
        </div>
        
    )
}

export default Home;