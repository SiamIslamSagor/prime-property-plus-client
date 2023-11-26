import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div>
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthPage;
