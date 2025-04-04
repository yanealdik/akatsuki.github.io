import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/akat.png";
import userIcon from "../../assets/images/User/User_01.svg";
import Profile from "../Profile/Profile";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Логотип" />
          </Link>
        </div>
        <nav className="navigation">
          <ul className="nav-els">
            <li className="nav-el">
              <Link to="#">Главная</Link>
            </li>
            <li className="nav-el">
              <Link to="#">Курсы</Link>
            </li>
            <li className="nav-el">
              <Link to="#">О Нас</Link>
            </li>
            <li className="nav-el">
              <Link to="#">Контакты</Link>
            </li>
          </ul>
        </nav>
        <div className="profile">
          <div className="profile-btn" onClick={toggleProfile}>
            <img src={userIcon} alt="Профиль" />
          </div>
          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;