import "./scss/index.scss";
import {
  Clients,
  Footer,
  Free,
  Home,
  Navbar,
  ScrollToTop,
  Signup,
  SuperRare,
} from "./components";

function Land() {
  
  return (
    <>
      <ScrollToTop />
      {/* <Navbar changeTheme={changeTheme} currentTheme={theme} /> */}
      <Home />
      <Free />
      {/* <Clients /> */}
      
      <Signup />
      <Footer />
      </>
   
  );
}

export default Land;
