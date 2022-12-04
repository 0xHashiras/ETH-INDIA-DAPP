import "./scss/index.scss";
import {
  Clients,
  Footer,
  Free,
  Mynft,
  Navbar,
  Mint,
  Play,
  Shop,
} from "./components";
import Land from './land';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NFT from './contracts/nft.json'


const defaultChainId = 80001;

export const supportedNetworks = {
    5777: {
        name: 'Truffle',
        tokenSymbol: 'ETH',
        rpcURL: 'http://localhost:7545',
        // govAddress: GovToken.networks[5777] ? GovToken.networks[5777].address : '',
        // exchangeAddress: Exchange.networks[5777] ? Exchange.networks[5777].address : '',
    },
    80001: {
        name: 'Mumbai',
        tokenSymbol: 'MATIC',
        rpcURL: 'https://rpc-mumbai.maticvigil.com',
        contract: '0x0c1197cB73D873E22d5f98c0e87708c8CB49D87d'
    }
}

const ConnectionContext = createContext()

export function useConnection() {
    return useContext(ConnectionContext);
}

function App() {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const [connectionState, setConnectionState] = useState({
    web3: null,
    chainId: defaultChainId,
    accounts: "",
    contract: null,
    error: null,
});

const initiate = async () => {
    try {
        // Use local web3 object by default before user connects metamask
        const provider = new Web3.providers.HttpProvider(supportedNetworks[defaultChainId].rpcURL);
        const web3 = new Web3(provider);

        const contract = new web3.eth.Contract(
            NFT,
            supportedNetworks[defaultChainId].contract
        );

        // const exchangeContract = new web3.eth.Contract(
        //     Exchange.abi,
        //     supportedNetworks[defaultChainId].exchangeAddress
        // );

        setConnectionState({ ...connectionState, web3, contract });
    } catch (e) {
        console.log("useConnection : initiate Error -> ", e.toString());
        setConnectionState({ ...connectionState, error: e.toString() });
    }
};

const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw "Browser Wallet Not Found";
        }

        const web3 = new Web3(window.ethereum);

        const [accounts] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const chainId = await web3.eth.net.getId();

        if (!supportedNetworks[chainId]) {
            throw "Please Use Polygon Mumbai Network"
        }

        const contract = new web3.eth.Contract(
          NFT,
          supportedNetworks[defaultChainId].contract
      );

        setConnectionState({ ...connectionState, web3, accounts, chainId, contract});
    } catch (e) {
        if (e.code === 4001) {
            // User rejected request
            e = 'Denied Browser Wallet Access';
        }
        console.log("useConnection : connectWallet Error -> ", e.toString());
        setConnectionState({ ...connectionState, error: e.toString() });
    }
}

useEffect(() => {
    initiate();

    if (window.ethereum) {
        // Detect metamask account change
        window.ethereum.on('accountsChanged', async function (_accounts) {
          connectWallet();
        })

        // Detect metamask network change
        window.ethereum.on('chainChanged', function (networkId) {
            connectWallet();
        });
    }
}, []);

if(connectionState.error) {
  return <div className="backdrop"><p>{connectionState.error}</p></div>
}

  return (
    <div className="App" data-theme={theme}>
      <ConnectionContext.Provider value={{ connectionState, setConnectionState, connectWallet }}>
      <BrowserRouter>
        <Navbar changeTheme={changeTheme} currentTheme={theme}/>
        <Routes>
          <Route path="/mint" element={<Mint />} />
          <Route path="/play" element={<Play />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mynft" element={<Mynft />} />
          <Route path="/" element={<Land />} />
          {/* <Route path="/governance/proposal/:index" element={<ProposalPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/" element={<ExchangePage />} /> */}
        </Routes>
      </BrowserRouter>
      </ConnectionContext.Provider>
      {/* <ScrollToTop />
      <Navbar changeTheme={changeTheme} currentTheme={theme} />
      <Home />
      
      <Clients />
      
      <Signup />
      <Footer /> */}
      
    </div>
  );
}

export default App;
