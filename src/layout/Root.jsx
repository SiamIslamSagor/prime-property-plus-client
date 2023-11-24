import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <div className="bg-base-200 pb-6">
        <Outlet></Outlet>
      </div>
      {/* <GooTop></GooTop> */}
      {/* <WebFooter></WebFooter> */}
      {/* <div className="h-[400vh] bg-gray-300"></div> */}
    </div>
  );
};

export default Root;
