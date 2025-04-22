import './Profile.css';
import Exit from "../../assets/images/Interface/Exit.svg";
import Setting from "../../assets/images/Setting/Settings.svg";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isOpen, onClose }) => {
    const [xpWidth, setXpWidth] = useState('0%');
    const navigate = useNavigate();
    
    // Function for navigation to profile page
    const goToProfilePage = () => {
        onClose(); 
        navigate('/profile');
    };
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setXpWidth('60%'), 100); // Animation on open
        } else {
            setXpWidth('0%'); // Reset on close
        }
    }, [isOpen]);
    
    const handleLogout = () => {
        console.log("User logged out");
        // Add logout logic here
        // navigate('/login');
    };

    return (
        <>
            <div className={`profile-sidebar ${isOpen ? 'active' : 'unactive'}`} id="profileMenu">
                <h2 className="profile-title">Профиль</h2>
                
                <div className="profile-info-container">
                    <div className="profile-info-item">
                        <strong>Имя:</strong> Алдияр
                    </div>
                    
                    <div className="profile-info-item">
                        <strong>Звание:</strong> Генин
                    </div>
                    
                    <div className="rank-progress-container">
                        <div className="profile-info-item xp-container">
                            <span>XP: 1200/2000</span>
                            <span className="next-rank-label">Чуунин</span>
                        </div>
                        
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: xpWidth }}></div>
                        </div>
                    </div>
                </div>
                
                <div className="profile-actions">
                    <button className="settings-btn" onClick={goToProfilePage}>
                        <img src={Setting} alt="Настройки" />
                        <span>Настройки</span>
                    </button>
                    
                    <button className="logout-button" onClick={handleLogout}>
                        <img src={Exit} alt="Выйти" />
                        <span>Выйти</span>
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="overlay" id="overlay" onClick={onClose}></div>
            )}
        </>
    );
};

export default Profile;