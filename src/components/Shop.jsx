import  { useContext, useEffect, useState } from 'react';
import shop from "../assets/shop.png";
import Web3 from "web3";
import { createContext } from 'react';
import { useConnection } from '../App';
import { useNavigate } from 'react-router-dom';

function Shop() {

    const { connectionState } = useConnection();
    const { accounts, chainId, contract } = connectionState;
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate()

    const check = () => {
        console.log(accounts, chainId)
    }

    // const getBalance = async () => {
    //   return await contract.methods.balanceOf(accounts).call();
    // }

    useEffect(() =>{
      (async ()=> {
        if(contract) {
          let balance = await contract.methods.balanceOf(accounts).call();
          console.log("balance", balance)
          setBalance(balance)
         }
      })()
    }, [])

    useEffect(() =>{
      (async ()=> {
        if(contract) {
          let balance = await contract.methods.balanceOf(accounts).call();
          console.log("balance", balance)
          setBalance(balance)
         }
      })()
    }, [contract, accounts])


  return (
    <div className="signup" id="signup">
      <div className="container" style={{paddingTop: '10rem'}}>
        <div className="left">
          <p className="sub-title">Mint A New Avatar</p>
          <h1 className="title">Balance : {balance}</h1>
          <p className="description">
            Make sure we have balance in wallet. Oh... Make sure you have wallet first then balance.
          </p>
          <button onClick={check} >POTION</button>
          <button onClick={check} >RANDOMON</button>
        </div>
        <div className="right">
          <div className="image">
            <img src={shop} alt="signup" width={500} height={500} />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
