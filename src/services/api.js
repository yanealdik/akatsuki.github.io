// src/services/api.js
import axios from 'axios';

// Создаем экземпляр axios с базовым URL для API
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления токена аутентификации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API для работы с аутентификацией
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// API для работы с курсами
export const coursesAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (courseId) => api.get(`/courses/${courseId}`),
  getCoursesByLanguage: (language) => api.get(`/courses/language/${language}`),
  getLesson: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}`),
  enrollCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
  updateProgress: (courseId, lessonId, completed) => 
    api.post(`/courses/${courseId}/progress`, { lesson_id: lessonId, completed }),
};

// API для работы с профилем пользователя
export const profileAPI = {
  getUserProfile: () => api.get('/profile'),
  updateUserProfile: (profileData) => api.put('/profile', profileData),
  getUserCourses: () => api.get('/profile/courses'),
  getUserCertificates: () => api.get('/profile/certificates'),
};

export default api;