import  { useContext, useEffect, useState } from 'react';
import signup from "../assets/ash.png";
import Web3 from "web3";
import { createContext } from 'react';
import { useConnection } from '../App';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const { Revise } = require("revise-sdk");
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMjRmYzk3LWI4YzktNDYzYy04NGNkLTEyNTFiNzk1ZTU1MSIsImtleSI6IjNzOGhtMGd5IiwiaWF0IjoxNjcwMTExMTM2fQ.Xl6Bz96ndd-X5UKi2NughvW5fuR_I4J-yqvJ1gQy8No";
const revise = new Revise({ auth: AUTH_TOKEN });
const COLLECTION_ID =  '45e2ab4d-7837-4359-af02-dac30e09fb37'; // test1


// apikey --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5YzU1ZWQ4LWRjOTctNDI3Yi05NGExLTQxYzZkMDllNjc0OCIsImtleSI6IjdnN3hyeDM4IiwiaWF0IjoxNjcwMTEwNTY0fQ.hGsDIZR2sUioKnQq7H_vD9xelKElgpKGKPlOFQzAlOg

function Mint() {

    const { connectionState } = useConnection();
    const { accounts, chainId, contract, error } = connectionState;
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const check = () => {
        console.log(accounts, chainId)
    }

    const run = async (tokenId) => {
      const nft = await revise.addNFT({
          image: "https://gateway.pinata.cloud/ipfs/QmSWgNVW1FWSswD1ESeXuRJ5qNsM7ya3Wapf9zLX3nnvhw",
          name: 'lion king',
          tokenId: tokenId,
          description: 'King of the jungle trying to slay the monsters in other dimensions',

      }, [
          { chain:"Polygon",
            Type: "Lion",
            power:"claws"

       },
      ], COLLECTION_ID)
      console.log("nft id is", nft) 
}

    const mint = async () => {
      try {
        setIsLoading(true);
        console.log("before mint", accounts)
        await contract.methods.safeMint(accounts).send({from: accounts});
        let totalSupply = await contract.methods.totalSupply().call()
        console.log("total ", Number(totalSupply) + 1);
        let tokenId = Number(totalSupply) + 1
        await run(tokenId);
        await getBalance();
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
      
      // await contract.methods.safeMint(accounts).call()
    }

    const getBalance = async () => {
      let balance = await contract.methods.balanceOf(accounts).call();
          console.log("balance", balance)
          setBalance(balance)
    }

    useEffect(() =>{
      (async ()=> {
        if(contract) {
          getBalance()
         }
      })()
    }, [])

    useEffect(() =>{
      (async ()=> {
        if(contract)
        getBalance()
      })()
    }, [contract, accounts])

    if (isLoading) {
      return <Loading text="Minting Please Wait" />;
  }

  return (
    <div className="signup" id="signup">
      <div className="container" style={{paddingTop: '10rem'}}>
        <div className="left">
          <p className="sub-title">Mint A New Avatar</p>
          <h1 className="title">Balance : {balance}</h1>
          <p className="description">
            Mint and play the game.
          </p>
         {balance == 0 ? <button onClick={mint} >Mint Avatar</button> :  <button onClick={() => navigate('/play')} >Enter Game</button>}
        </div>
        <div className="right">
          <div className="image">
            <img src={signup} alt="signup" width={300} height={300} />
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

export default Mint;
