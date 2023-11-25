import { Outlet } from "react-router-dom";
import NavBar from "../components/pageComponents/NavBar/NavBar";
import Footer from "../components/pageComponents/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
      {/* <GooTop></GooTop> */}
      {/* <WebFooter></WebFooter> */}
      {/* <div className="h-[400vh] bg-gray-300"></div> */}
      <Footer></Footer>
    </div>
  );
};

export default Root;
