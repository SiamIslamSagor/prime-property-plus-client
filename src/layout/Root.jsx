import { Outlet } from "react-router-dom";
import NavBar from "../components/pageComponents/NavBar/NavBar";
import Footer from "../components/pageComponents/Footer/Footer";
import ScrollTopBtn from "../components/utilitiesComponents/ScrollTopBtn";

const Root = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
      <ScrollTopBtn></ScrollTopBtn>
      {/* <WebFooter></WebFooter> */}
      {/* <div className="h-[400vh] bg-gray-300"></div> */}
      <Footer></Footer>
    </div>
  );
};

export default Root;
