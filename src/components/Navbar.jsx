import { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import Web3 from "web3";
import { createContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useConnection } from '../App';


const Navbar = ({ changeTheme, currentTheme, children }) => {
  const [navState, setNavState] = useState(false);
  const navigate = useNavigate();

  const { connectionState, connectWallet } = useConnection();
  const { accounts } = connectionState;

  const displayAddress = (address) => {
    console.log("address is", address)
    if (!address) return "";
    let prefix = address.substring(0, 4);
    let sufix = address?.substring(
      address.length - 4
    );
    return `${prefix}...${sufix}`;
  };
  return (
    <nav>
      <div className="brand-container">
        <div className="brand">
          <img src={logo} alt="logo" onClick={() => navigate('/')} />
        </div>
        <div className="toggle-container">
          <div className="toggle">
            {navState ? (
              <MdClose onClick={() => setNavState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavState(true)} />
            )}
          </div>
          <div className="mode">
            {currentTheme === "dark" ? (
              <ImSun className="light" onClick={changeTheme} />
            ) : (
              <BsFillMoonFill className="dark" onClick={changeTheme} />
            )}
          </div>
        </div>
      </div>
      <div className={`links-container ${navState ? "nav-visible" : ""}`}>
        <ul className="links">
          <li>
            <a onClick={() => navigate('/mint')}>
              Mint
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/play')}>
              Play
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/shop')}>
              Shop
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/mynft')}>
              My NFT
            </a>
          </li>
          {/* <li>
            <a href="#footer" onClick={() => setNavState(false)}>
              Contact
            </a>
          </li> */}
          {accounts.length > 0 ? 
          <li><a>{displayAddress(accounts)}</a></li>
          : <li>
            <a onClick={() => connectWallet()}>
              Connect Wallet
            </a>
          </li>}
          <li onClick={changeTheme}>
            {currentTheme === "dark" ? (
              <ImSun className="light" />
            ) : (
              <BsFillMoonFill className="dark" />
            )}
          </li>
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;
