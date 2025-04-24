import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/akat.png";
import { authAPI } from "../../services/api"; // Импортируем наш API сервис
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    verificated: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      
      if (isLogin) {
        // Отправляем запрос на вход
        response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        // Отправляем запрос на регистрацию
        response = await authAPI.register({
          name: formData.name, // Используется как nickname
          email: formData.email,
          password: formData.password,
          verificated: formData.verificated
        });
      }

      // Если успешно, сохраняем токен и данные пользователя
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Можно также сохранить некоторые данные пользователя
        localStorage.setItem('userNickname', response.data.user.nickname);
        
        navigate("/profile");
      }
    } catch (err) {
      console.error("Ошибка аутентификации:", err);
      setError(
        err.response?.data?.message || 
        "Произошла ошибка при авторизации. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Лого" />
        </div>
        <h2>{isLogin ? "Вход в аккаунт" : "Регистрация"}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
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
                disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Код для проверки</label>
              <input
                type="text"
                name="verificated"
                value={formData.verificated}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          )}
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading 
              ? "Загрузка..." 
              : isLogin 
                ? "Войти" 
                : "Зарегистрироваться"}
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