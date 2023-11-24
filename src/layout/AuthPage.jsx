import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div>
      <div className="bg-base-200 pb-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthPage;
