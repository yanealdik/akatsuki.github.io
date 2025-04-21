import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/akat.png";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика авторизации/регистрации
    // После успешной авторизации перенаправляем на профиль
    navigate("/profile");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Лого" />
        </div>
        <h2>{isLogin ? "Вход в аккаунт" : "Регистрация"}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Подтвердите пароль</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <button type="submit" className="auth-btn">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <span onClick={toggleForm}>
              {isLogin ? " Зарегистрироваться" : " Войти"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;