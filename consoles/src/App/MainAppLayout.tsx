import { Outlet } from "react-router";
import Navbar from "../Widgets/Navbar/Navbar";
import Sidebar from "../Widgets/sidebar/Sidebar";

const MainAppLayout = () => {
  return (
    <div className="app__layout">
      <Navbar />
      <div className="app__container">
        <Sidebar />
        <div className="app__main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainAppLayout;
