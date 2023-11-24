import { Outlet } from "react-router-dom";
import NavBar from "../components/pageComponents/NavBar/NavBar";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="mb-[30vh]"></div>
      <div>
        <Outlet></Outlet>
      </div>
      {/* <GooTop></GooTop> */}
      {/* <WebFooter></WebFooter> */}
      {/* <div className="h-[400vh] bg-gray-300"></div> */}
    </div>
  );
};

export default Root;
