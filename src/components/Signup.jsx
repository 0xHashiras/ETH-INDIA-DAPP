
import signup from "../assets/ash.png";


const Signup = () => {


  return (
    <div className="signup" id="signup">
      <div className="container">
        <div className="left">
          <p className="sub-title">Launching Soon</p>
          <h1 className="title">An NFT like no other</h1>
          <p className="description">
            Don't miss out on the release of our new NFT. Sign up below to
            receive updates when we go live.
          </p>
          <button >Sign Up</button>
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

export default Signup;
