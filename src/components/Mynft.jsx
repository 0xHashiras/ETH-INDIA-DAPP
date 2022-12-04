import { useContext, useEffect, useState } from 'react';
import { useConnection, supportedNetworks } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import grass from '../assets/grass.jpeg'

function Shop() {

    const { connectionState } = useConnection();
    const { accounts, chainId, contract } = connectionState;
    const [mynft, setMynft] = useState([]);
    const navigate = useNavigate()

    const check = () => {
        console.log(accounts, chainId)
    }

    // const getBalance = async () => {
    //   return await contract.methods.balanceOf(accounts).call();
    // }

    useEffect(() => {
        (async () => {
            if (accounts) {
                try {
                    let { data } = await axios.get(`https://api.nftport.xyz/v0/nfts/${supportedNetworks[chainId].contract}?chain=goerli&page_number=1&page_size=50&include=metadata&refresh_metadata=false`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: '3aaf0b46-f5f4-49b5-8cea-12b9fa773e01'
                        }
                    });
                    console.log(data.nfts);
                    setMynft(data.nfts)
                } catch (error) {
                    setMynft([])
                }
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (accounts) {
                try {
                    let { data } = await axios.get(`https://api.nftport.xyz/v0/nfts/${supportedNetworks[chainId].contract}?chain=goerli&page_number=1&page_size=50&include=metadata&refresh_metadata=false`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: '3aaf0b46-f5f4-49b5-8cea-12b9fa773e01'
                        }
                    });
                    console.log(data.nfts);
                    setMynft(data.nfts)
                } catch (error) {
                    setMynft([])
                }
            }
        })()
    }, [contract, accounts])


    return (
        <div className="signup" id="signup">
            <div className="container" style={{ paddingTop: '10rem' }}>
                {mynft.length > 0 ? mynft.map((ele, i) => {

                    return (<Card key={i} image={ele.cached_file_url || grass} series={"test"} price={0.005} tag={"pokemon"} title={ "test"} time={"7898789"}  />)
                }) : <h1 style={{textAlign: 'center', color: 'white', justifyContent: 'center'}}>No Data</h1>}
                {/* <Card image={} /> */}
                {/* <div className="left">
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
        </div> */}
            </div>
        </div>
    );
};

export default Shop;
