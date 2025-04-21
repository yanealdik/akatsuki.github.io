import './Profile.css';
import Exit from "../../assets/images/Interface/Exit.svg";
import Setting from "../../assets/images/Setting/Settings.svg";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавлен импорт для навигации

const Profile = ({ isOpen, onClose }) => {
    const [xpWidth, setXpWidth] = useState('0%');
    const navigate = useNavigate(); // Хук для навигации
    
    // Функция для перехода на страницу профиля
    const goToProfilePage = () => {
        onClose(); // Закрываем текущий профиль
        navigate('/profile'); // Переходим на страницу профиля
    };
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setXpWidth('60%'), 100); // Запускаем анимацию при открытии
        } else {
            setXpWidth('0%'); // Сбрасываем при закрытии
        }
    }, [isOpen]);
    
    const handleLogout = () => {
        // Добавьте логику выхода
        console.log("Пользователь вышел");
        // Например: logout() и затем редирект на страницу входа
        // navigate('/login');
    };

    return (
        <>
            <div className={`profile-sidebar ${isOpen ? 'active' : 'unactive'}`} id="profileMenu">
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
                    <div className="xp-bar" style={{ width: xpWidth }}></div>
                    <span className="xp-text">new rank</span>
                </div>
                
                <p className="setting" onClick={goToProfilePage}>
                    Настройки
                </p>
                
                <div className="logout-btn" onClick={handleLogout}>
                    <img src={Exit} alt="Выйти" />
                </div>
                
                <button className="setting-btn" onClick={goToProfilePage}>
                    <img src={Setting} alt="Настройки" />
                </button>
            </div>
            
            {isOpen && (
                <div className="overlay" id="overlay" onClick={onClose}></div>
            )}
        </>
    );
};

export default Profile;