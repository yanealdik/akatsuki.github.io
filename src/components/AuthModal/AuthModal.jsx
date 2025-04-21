import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSuccess, courseId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    // Additional validation for registration
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
      
      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      // Prepare data based on form type
      const requestData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
        credentials: 'include' // Important for cookies
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Произошла ошибка');
      }
      
      // Set success message based on action
      setSuccessMessage(isLogin 
        ? 'Вход выполнен успешно!' 
        : 'Регистрация успешна! Теперь вы можете войти.'
      );
      
      // If successful and we have a token, store it
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // After short delay, close modal and notify parent component of success
      setTimeout(() => {
        onSuccess(data.user);
        
        // If login was successful and we have a courseId, enroll in the course
        if (isLogin && courseId) {
          enrollInCourse(courseId, data.token || localStorage.getItem('authToken'));
        }
      }, 1500);
      
    } catch (error) {
      setErrors({
        ...errors,
        general: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const enrollInCourse = async (courseId, token) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to enroll in course');
      }
      
      // Enrollment successful
      console.log('Successfully enrolled in course');
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="auth-modal-header">
          <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
          <p>{isLogin 
            ? 'Войдите, чтобы записаться на курс и отслеживать свой прогресс' 
            : 'Создайте аккаунт, чтобы получить доступ к курсам и материалам'}</p>
        </div>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтверждение пароля</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Подтвердите пароль"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}
          
          <button 
            type="submit" 
            className={`auth-submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading 
              ? 'Подождите...' 
              : (isLogin ? 'Войти' : 'Зарегистрироваться')
            }
          </button>
        </form>
        
        <div className="auth-toggle">
          {isLogin 
            ? 'Нет аккаунта? ' 
            : 'Уже есть аккаунт? '
          }
          <button 
            type="button" 
            className="toggle-button" 
            onClick={toggleAuthMode}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;