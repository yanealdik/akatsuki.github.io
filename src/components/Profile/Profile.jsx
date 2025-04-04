import './Profile.css';
import Exit from "../../assets/images/Interface/Exit.svg";
import Setting from "../../assets/images/Setting/Settings.svg";
import React, { useState, useEffect } from 'react';


const Profile = ({ isOpen, onClose }) => {

        const [xpWidth, setXpWidth] = useState('0%');
      
        useEffect(() => {
          if (isOpen) {
            setTimeout(() => setXpWidth('60%'), 100); // Запускаем анимацию при открытии
          } else {
            setXpWidth('0%'); // Сбрасываем при закрытии
          }
        }, [isOpen]);
  return (
    <div>
      <div 
        className={`profile-sidebar ${isOpen ? 'active' : 'unactive'}`}
        id="profileMenu"
      >
        <h2 className="pro">Профиль</h2>
        
        <p className="name">
          <strong>Имя:</strong> Алдияр
        </p>
        
        <p className="rank">
          <strong>Звание:</strong> Генин
        </p>
        
        <p className="xp-txt">XP: 1200/2000</p>
        
        <p className="new-rank">Чуунин</p>
        
        <div className="xp-bar-container">
          <div 
            className="xp-bar" 
            style={{ width: xpWidth }}
          ></div>
          <span className="xp-text">new rank</span>
        </div>
        
        <p 
          className="setting"
          onClick={() => {/* Add settings logic */}}
        >
          Настройки
        </p>
        
        <div 
          className="logout-btn"
          onClick={() => {/* Add logout logic */}}
        >
          <img 
            src={Exit} 
            alt="Выйти" 
          />
        </div>
        
        <div 
          className="setting-btn"
          onClick={() => {/* Add settings modal logic */}}
        >
          <img 
            src={Setting}
            alt="" 
          />
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="overlay" 
          id="overlay" 
          onClick={onClose}
        ></div>
      )}
    </div>
  );
};

export default Profile;