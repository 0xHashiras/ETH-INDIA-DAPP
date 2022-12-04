import React from "react";
import home from "../assets/group_pika.png";

const Home = () => {
  return (
    <div className="home" id="home">
      <div className="container">
        <div className="left">
          <p className="sub-title">Launching Soon</p>
          <h1 className="title">An NFT For Pokemon Gamers</h1>
          <p className="description">
            Don't miss out on the release of our new NFT. 
          </p>
          {/* <button>Sign Up</button> */}
        </div>
        <div className="right">
          <div className="image">
            <img src={home} alt="home" width={300} height={400} />
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

export default Home;
