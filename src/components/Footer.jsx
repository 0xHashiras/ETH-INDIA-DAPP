import { footerLinks } from "../data";
import logo from "../assets/logo.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="upper">
        <div className="brand-container">
          <div className="brand">
            <img src={logo} alt="logo" />
          </div>
          <p>Exclusive NFT Collection</p>
          <ul>
            <li>
              <BsFacebook />
            </li>
            <li>
              <BsTwitter />
            </li>
            <li>
              <BsInstagram />
            </li>
            <li>
              <FaTiktok />
            </li>
          </ul>
        </div>
        <div className="links">
          {footerLinks.map(({ title, data }, index) => (
            <div className="link" key={index}>
              <h4>{title}</h4>
              <ul>
                {data.map((link, index2) => (
                  <li key={index2}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="lower">
        <span>NFT Landing Page (Demo) &copy; Copyright 2022 NFT</span>
        <span>Launching Soon 2022</span>
      </div>
    </footer>
  );
};

export default Footer;
