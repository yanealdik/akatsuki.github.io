import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ProfilePage.css";
import userAvatar from "../../assets/images/User/User_01.svg";
import settingsIcon from "../../assets/images/Setting/Settings.svg";
import certificateIcon from "../../assets/images/Warning/Wavy_Check.svg";
import courseIcon from "../../assets/images/System/Terminal.svg";
import reviewIcon from "../../assets/images/Interface/Chart_Bar_Vertical_01.svg";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Моковые данные для демонстрации
  const userData = {
    name: "Алдияр",
    rank: "Генин",
    xp: 1200,
    maxXp: 2000,
    nextRank: "Чуунин",
    courses: [
      { id: 1, name: "Python для начинающих", progress: 65, image: "/path/to/python.jpg" },
      { id: 2, name: "React основы", progress: 30, image: "/path/to/react.jpg" }
    ],
    certificates: [
      { id: 1, name: "JavaScript Базовый", date: "15.12.2023", image: "/path/to/cert1.jpg" },
      { id: 2, name: "HTML & CSS", date: "02.03.2024", image: "/path/to/cert2.jpg" }
    ]
  };
  
  const renderOverview = () => (
    <div className="profile-overview">
      <div className="user-stats">
        <div className="user-avatar-large">
          <img src={userAvatar} alt="Аватар пользователя" />
        </div>
        <div className="user-info-large">
          <h2>{userData.name}</h2>
          <div className="rank-info">
            <div className="rank-title">Звание: {userData.rank}</div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${(userData.xp / userData.maxXp) * 100}%` }}></div>
            </div>
            <div className="xp-info">XP: {userData.xp}/{userData.maxXp}</div>
            <div className="next-rank">Следующее звание: {userData.nextRank}</div>
          </div>
        </div>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <h3>Активные курсы</h3>
          <div className="active-courses">
            {userData.courses.map(course => (
              <div className="course-card" key={course.id}>
                <div className="course-imagee">
                  <img src={course.image} alt={course.name} />
                </div>
                <div className="course-info">
                  <h4>{course.name}</h4>
                  <div className="course-progress">
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                  <Link to={`/courses/${course.id}/lessons`} className="continue-btn">
                    Продолжить
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Последние сертификаты</h3>
          <div className="certificates-preview">
            {userData.certificates.slice(0, 2).map(cert => (
              <div className="certificate-card" key={cert.id}>
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.name} />
                </div>
                <div className="certificate-info">
                  <h4>{cert.name}</h4>
                  <p>Получен: {cert.date}</p>
                </div>
              </div>
            ))}
            {userData.certificates.length > 2 && (
              <button className="view-all-btn" onClick={() => setActiveTab("certificates")}>
                Посмотреть все
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCourses = () => (
    <div className="profile-courses">
      <h2>Мои курсы</h2>
      <div className="courses-grid">
        {userData.courses.map(course => (
          <div className="course-card-full" key={course.id}>
            <div className="course-imagee">
              <img src={course.image} alt={course.name} />
            </div>
            <div className="course-details">
              <h3>{course.name}</h3>
              <div className="course-progress">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span>{course.progress}%</span>
              </div>
            </div>
            <div className="course-actions">
              <Link to={`/courses/${course.id}/lessons`} className="continue-btn">
                Продолжить
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderCertificates = () => (
    <div className="profile-certificates">
      <h2>Мои сертификаты</h2>
      <div className="certificates-grid">
        {userData.certificates.map(cert => (
          <div className="certificate-card-full" key={cert.id}>
            <div className="certificate-image">
              <img src={cert.image} alt={cert.name} />
            </div>
            <div className="certificate-details">
              <h3>{cert.name}</h3>
              <p>Получен: {cert.date}</p>
              <button className="download-btn">Скачать PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderSettings = () => (
    <div className="profile-settings">
      <h2>Настройки профиля</h2>
      <form className="settings-form">
        <div className="form-group">
          <label>Имя</label>
          <input type="text" name="name" defaultValue={userData.name} />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" defaultValue="user@example.com" />
        </div>
        
        <div className="form-group">
          <label>Изменить пароль</label>
          <input type="password" name="currentPassword" placeholder="Текущий пароль" />
          <input type="password" name="newPassword" placeholder="Новый пароль" />
          <input type="password" name="confirmPassword" placeholder="Подтвердите пароль" />
        </div>
        
        <div className="form-group">
          <label>Уведомления</label>
          <div className="checkbox-group">
            <input type="checkbox" id="emailNotifications" name="emailNotifications" defaultChecked />
            <label htmlFor="emailNotifications">Получать уведомления по email</label>
          </div>
        </div>
        
        <button type="submit" className="save-btn">Сохранить изменения</button>
      </form>
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "courses":
        return renderCourses();
      case "certificates":
        return renderCertificates();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };
  
  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <img src={userAvatar} alt="Аватар пользователя" />
            </div>
            <div className="user-details">
              <h3>{userData.name}</h3>
              <p>{userData.rank}</p>
              <div className="xp-bar">
                <div className="xp-progress" style={{ width: `${(userData.xp / userData.maxXp) * 100}%` }}></div>
              </div>
              <p className="xp-text">XP: {userData.xp}/{userData.maxXp}</p>
            </div>
          </div>
          
          <nav className="profile-nav">
            <ul>
              <li 
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
              >
                <span className="icon">
                  <img src={reviewIcon} alt="Обзор" />
                </span>
                Обзор
              </li>
              <li 
                className={activeTab === "courses" ? "active" : ""}
                onClick={() => setActiveTab("courses")}
              >
                <span className="icon">
                  <img src={courseIcon} alt="Курсы" />
                </span>
                Мои курсы
              </li>
              <li 
                className={activeTab === "certificates" ? "active" : ""}
                onClick={() => setActiveTab("certificates")}
              >
                <span className="icon">
                  <img src={certificateIcon} alt="Сертификаты" />
                </span>
                Сертификаты
              </li>
              <li 
                className={activeTab === "settings" ? "active" : ""}
                onClick={() => setActiveTab("settings")}
              >
                <span className="icon">
                  <img src={settingsIcon} alt="Настройки" />
                </span>
                Настройки
              </li>
            </ul>
          </nav>
          
          <div className="logout-btn">
            <Link to="/">Выйти</Link>
          </div>
        </div>
        
        <div className="profile-content">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;