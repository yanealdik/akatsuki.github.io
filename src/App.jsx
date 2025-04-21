import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Itachi from "./components/Itachi/Itachi";
import { AboutUs } from "./components/Info/AboutUs";
import { LanguagesSwiper } from './components/Slider_Lan/SliderL';
import Footer from "./components/Footer/Footer";
import CourseModal, { CourseGrid } from "./components/CourseModal/CourseModal";
import Tutorial from "./components/Lesson_Tutorial/Tutorial";
import Testimonials from "./components/Reviews/Reviews";
import CourseLessonPage from "./components/CourseLessonPage/CourseLessonPage";
import AuthPage from "./components/AuthPage/AuthPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import './App.css';

// Защищенный маршрут как компонент
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Главная страница как компонент
function Home({  
  handleLanguageClick, 
  isModalOpen, 
  selectedCourseId, 
  selectedLanguage, 
  scrollToCourses, 
  onCloseModal 
}) {
  return (
    <div className="home-container">
      <Header />
      <div className="hero-section">
        <div className="about-itachi-container">
          <AboutUs />
          <Itachi />
        </div>

        <LanguagesSwiper onLanguageClick={handleLanguageClick} />
        <Tutorial className="section-spacing" />

        <Testimonials />

        <CourseModal 
          isOpen={isModalOpen}
          onClose={onCloseModal}
          courseId={selectedCourseId}
          languageName={selectedLanguage}
          onViewAllClick={scrollToCourses}
        />
      </div>
      <Footer className="section-spacing" />
    </div>
  );
}

// App с роутингом
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedLanguage(null);
    setIsModalOpen(true);
  };

  const handleLanguageClick = (languageName) => {
    setSelectedLanguage(languageName);
    setSelectedCourseId(null);
    setIsModalOpen(true);
  };

  const scrollToCourses = () => {
    const coursesSection = document.querySelector('.section-title');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleCourseClick={handleCourseClick}
              handleLanguageClick={handleLanguageClick}
              isModalOpen={isModalOpen}
              selectedCourseId={selectedCourseId}
              selectedLanguage={selectedLanguage}
              scrollToCourses={scrollToCourses}
              onCloseModal={handleCloseModal}
            />
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route 
          path="/profile" 
          element={
          
              <ProfilePage />
            
          } 
        />
        <Route
          
          path="/courses"
          element={
            
            <>
            <Header />
              <section className="section section-spacing" id="courses-section">
                <h2 className="section-title">Наши курсы</h2>
                <CourseGrid onCourseClick={handleCourseClick} />
              </section>

              <CourseModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                courseId={selectedCourseId}
                languageName={selectedLanguage}
                onViewAllClick={scrollToCourses}
              />
            </>
          }
        />
        <Route
          path="/courses/:id/lessons"
          element={
            <div className="course-lesson-wrapper">
              <CourseLessonPage />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;