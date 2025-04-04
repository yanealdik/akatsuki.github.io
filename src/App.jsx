// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Itachi from "./components/Itachi/Itachi";
import { AboutUs } from "./components/Info/AboutUs";
import { LanguagesSwiper } from './components/Slider_Lan/SliderL';
import Footer from "./components/Footer/Footer";
import "./App.css";
import "./components/Header/Header.css";
import "./components/Itachi/Itachi.css";
import "./components/Loading/Load.css";
import CourseModal, { CourseGrid } from "./components/CourseModal/CourseModal";
import Tutorial from "./components/Lesson_Tutorial/Tutorial";
import Testimonials from "./components/Reviews/Reviews";

function App() {
  // Добавляем состояния для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(null);


  // Функция для обработки клика по курсу
  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedLanguage(null); // Сбрасываем выбранный язык
    setIsModalOpen(true);
    console.log("Selected course ID:", courseId);
  };

  // Функция для обработки клика по языку в слайдере
  const handleLanguageClick = (languageName) => {
    console.log("Selected language:", languageName);
    setSelectedLanguage(languageName);
    setSelectedCourseId(null); // Сбрасываем выбранный курс
    setIsModalOpen(true);
  };

  // Функция для скроллинга к разделу курсов
  const scrollToCourses = () => {
    const coursesSection = document.querySelector('.section-title');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <Router>
      <div className="home-container">
        <Header />
        <div className="hero-section">
          <div className="about-itachi-container">
            <AboutUs />
            <Itachi />
          </div>
          <LanguagesSwiper onLanguageClick={handleLanguageClick} />
          
          <Tutorial className="section-spacing"/>
          
          <section className="section section-spacing" id="courses-section">
            <h2 className="section-title">Наши курсы</h2>
            <CourseGrid onCourseClick={handleCourseClick} />
          </section>

          <Testimonials />
      
          <CourseModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            courseId={selectedCourseId}
            languageName={selectedLanguage}
            onViewAllClick={scrollToCourses}
          />
        </div>
        <Footer className="section-spacing" />
      </div>
    </Router>
  );
}
export default App;