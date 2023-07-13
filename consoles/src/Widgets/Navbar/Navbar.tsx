import "./Navbar.scss";
import logo from "../../Shared/assets/rsk-logo.svg";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const responseData = localStorage.getItem("responseData");
  const parsedData = responseData ? JSON.parse(responseData) : null;

  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar__window-number">
          <h3>Окно №{parsedData?.user.window_number}</h3>
        </div>
        <div className="navbar__right">
          <span>7:00-8:23</span>
          <AiOutlineUser className="navbar__avatar" />
          <span>
            {parsedData?.user.last_name}.{" "}
            {parsedData?.user.first_name[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
