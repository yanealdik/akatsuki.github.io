import React, { useState, useEffect } from "react"; 
import cerflogo from "../../assets/images/akat.png";
import  { useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios"; // Добавьте импорт axios, если его еще нет
import {
  CheckSquare,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Award,
  XCircle,
  Check,
  Menu,
  X,
  Download // Добавляем иконку Download
} from "lucide-react";
import html2canvas from 'html2canvas'; // Добавьте эту библиотеку в проект
import jsPDF from 'jspdf';
import Header from "../Header/Header";
import "./CoursePlayerPage.css";

const CoursePlayerPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  // Состояния для интерактивных элементов
  const [activeSection, setActiveSection] = useState("intro");
  const [currentStep, setCurrentStep] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(15);
  const [xp, setXp] = useState(275);
  const [xpToNextLevel, setXpToNextLevel] = useState(850);
  const [codeValue, setCodeValue] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [testAnswers, setTestAnswers] = useState({
    question1: "",
    question2: "",
    question3: ""
  });
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [courseCompleted, setCourseCompleted] = useState(false);
  
  // Состояния для профиля скачивания сертификата
  const [userPhoto, setUserPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Состояния для текущего курса и урока
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [courseModules, setCourseModules] = useState([]);
  
  // Состояния для комментариев и реакций
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(256);
  const [dislikeCount, setDislikeCount] = useState(12);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Сакура Х.",
      avatar: "/api/placeholder/40/40",
      text: "Хорошо объяснили основы. Спасибо за доступное изложение!",
      likes: 18,
      timestamp: "3 часа назад"
    },
    {
      id: 2,
      author: "Наруто У.",
      avatar: "/api/placeholder/40/40",
      text: "Домашнее задание было сложным, но интересным!",
      likes: 4,
      timestamp: "вчера"
    }
  ]);
  
  // Количество шагов в уроке
  const totalSteps = 5; // Введение, Видео, Практика, Тест, Сертификация
  
  const courseStructures = {
    // Python
    python: {
      title: "Python: Полный Курс",
      modules: [
        {
          id: 1,
          title: "Основы Python",
          lessons: [
            {
              id: "1.1",
              title: "Введение в Python",
              intro: {
                title: "Добро пожаловать в мир Python!",
                content: `
                  <p>
                    Рады приветствовать вас на курсе "Python: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить основы программирования на одном из самых популярных и универсальных языков.
                  </p>
                  <p>
                    Python — современный язык программирования, который отличается читаемым синтаксисом и 
                    гибкостью. Он используется в веб-разработке, анализе данных, машинном обучении, 
                    автоматизации и многих других областях.
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Писать код на Python</li>
                    <li>Работать с переменными и типами данных</li>
                    <li>Создавать функции и использовать объекты</li>
                    <li>Работать с библиотеками и пакетами</li>
                  </ul>
                `
              },
              practice: {
                instructions: "Создайте функцию <code>print_hello()</code>, которая выводит 'Привет, мир!' на экран. Затем вызовите эту функцию.",
                codeTemplate: `def print_hello():
      # Ваш код здесь
    
    # Вызов функции
  `
              },
              test: [
                {
                  question: "Какая функция используется для вывода текста в консоль в Python?",
                  options: ["console.log()", "print()", "echo"],
                  correct: 1
                },
                {
                  question: "Какое расширение имеют файлы Python?",
                  options: [".py", ".pt", ".pyth"],
                  correct: 0
                },
                {
                  question: "Как создать комментарий в Python?",
                  options: ["// Комментарий", "/* Комментарий */", "# Комментарий"],
                  correct: 2
                }
              ]
            }
          ]
        }
      ]
    },
    
    // C#
    csharp: {
      title: "C#: Полный Курс",
      modules: [
        {
          id: 1,
          title: "Основы C#",
          lessons: [
            {
              id: "1.1",
              title: "Введение в C#",
              intro: {
                title: "Добро пожаловать в мир C#!",
                content: `
                  <p>
                    Рады приветствовать вас на курсе "C#: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить основы программирования на мощном языке от Microsoft.
                  </p>
                  <p>
                    C# — объектно-ориентированный язык программирования, который используется для разработки 
                    настольных приложений, игр (Unity), веб-приложений (ASP.NET), и мобильных приложений (Xamarin).
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Писать код на C#</li>
                    <li>Работать с переменными и типами данных</li>
                    <li>Создавать классы и использовать ООП</li>
                    <li>Разрабатывать приложения на платформе .NET</li>
                  </ul>
                `
              },
              practice: {
                instructions: "Создайте метод <code>SayHello()</code>, который выводит 'Привет, мир!' в консоль. Затем вызовите этот метод в методе Main.",
                codeTemplate: `using System;
  
  class Program
  {
      static void Main(string[] args)
      {
          // Вызов метода
      }
      
      // Ваш метод здесь
  }`
              },
              test: [
                {
                  question: "Что такое .NET?",
                  options: ["Язык программирования", "Фреймворк для разработки", "База данных"],
                  correct: 1
                },
                {
                  question: "Какой модификатор доступа используется для публичных методов в C#?",
                  options: ["public", "private", "protected"],
                  correct: 0
                },
                {
                  question: "Какой оператор используется для создания экземпляра класса?",
                  options: ["create", "new", "instance"],
                  correct: 1
                }
              ]
            }
          ]
        }
      ]
    },
    
    // JavaScript
javascript: {
  title: "JavaScript: Легкий Старт",
  modules: [
    {
      id: 1,
      title: "Основы JavaScript",
      lessons: [
        {
          id: "1.1",
          title: "Введение в JavaScript",
          intro: {
            title: "Начинаем с JavaScript!",
            content: `
              <p>JavaScript — язык программирования, который делает веб-страницы интерактивными.</p>
              <p>На этом курсе вы узнаете:</p>
              <ul>
                <li>Как добавлять JS в HTML</li>
                <li>Работать с переменными</li>
                <li>Создавать простые функции</li>
              </ul>
            `
          },
          practice: {
            instructions: "Создайте функцию <code>sayHello()</code>, которая выводит 'Привет, JS!'.",
            codeTemplate: `function sayHello() {
  // Ваш код здесь
}

// Вызов функции
`
          },
          test: [
            {
              question: "Как объявить переменную?",
              options: ["var x = 5;", "let x = 5;", "const x = 5;", "Все варианты верны"],
              correct: 3
            },
            {
              question: "Какой тип данных у строки 'Привет'?",
              options: ["number", "boolean", "string"],
              correct: 2
            },
            {
              question: "Какой оператор используется для условий?",
              options: ["if", "loop", "func"],
              correct: 0
            }
          ]
        }
      ]
    }
  ]
},

// React
react: {
  title: "React: Первые шаги",
  modules: [
    {
      id: 1,
      title: "Основы React",
      lessons: [
        {
          id: "1.1",
          title: "Что такое React?",
          intro: {
            title: "Добро пожаловать в React!",
            content: `
              <p>React — библиотека для создания пользовательских интерфейсов от Facebook.</p>
              <p>Вы научитесь:</p>
              <ul>
                <li>Создавать компоненты</li>
                <li>Передавать props</li>
                <li>Использовать state</li>
              </ul>
            `
          },
          practice: {
            instructions: "Создайте компонент <code>Hello</code>, который отображает 'Привет, React!'.",
            codeTemplate: `function Hello() {
  return <h1>Привет, React!</h1>;
}

// Рендер компонента
`
          },
          test: [
            {
              question: "Какой синтаксис используется в JSX?",
              options: ["HTML", "JavaScript", "Оба вместе"],
              correct: 2
            },
            {
              question: "Как передать props?",
              options: ["Через атрибуты компонента", "Через CSS", "Через state"],
              correct: 0
            },
            {
              question: "Что делает хук useState?",
              options: ["Меняет CSS", "Хранит состояние компонента", "Отображает страницу"],
              correct: 1
            }
          ]
        }
      ]
    }
  ]
},

// C++
cpp: {
  title: "C++: Базовый курс",
  modules: [
    {
      id: 1,
      title: "Знакомство с C++",
      lessons: [
        {
          id: "1.1",
          title: "Начало работы с C++",
          intro: {
            title: "Программирование на C++",
            content: `
              <p>C++ — мощный язык для системного и прикладного программирования.</p>
              <p>Вы изучите:</p>
              <ul>
                <li>Синтаксис C++</li>
                <li>Ввод и вывод данных</li>
                <li>Простые конструкции управления</li>
              </ul>
            `
          },
          practice: {
            instructions: "Напишите программу, которая выводит 'Привет, C++!' на экран.",
            codeTemplate: `#include <iostream>
using namespace std;

int main() {
  // Ваш код здесь
  return 0;
}`
          },
          test: [
            {
              question: "Какой заголовочный файл нужен для cout?",
              options: ["#include <stdio.h>", "#include <iostream>", "#include <string>"],
              correct: 1
            },
            {
              question: "Какой символ завершает инструкцию?",
              options: [".", ";", ":"],
              correct: 1
            },
            {
              question: "Как объявить переменную целого числа?",
              options: ["int x;", "float x;", "char x;"],
              correct: 0
            }
          ]
        }
      ]
    }
  ]
}

  };

  // Инициализация данных курса и урока при загрузке компонента
  useEffect(() => {
    // Если courseId не указан, используем javascript по умолчанию
    const activeCourseId = courseId || "javascript";
    const activeLessonId = lessonId || "1.1";
    
    const selectedCourse = courseStructures[activeCourseId];
    
    if (selectedCourse) {
      setCurrentCourse(selectedCourse);
      
      // Формируем структуру модулей для навигации
      const modules = selectedCourse.modules.map(module => {
        const moduleLessons = module.lessons.map(lesson => {
          return {
            id: lesson.id,
            title: lesson.title,
            completed: false,
            current: lesson.id === activeLessonId
          };
        });
        
        return {
          id: module.id,
          title: module.title,
          completed: false,
          lessons: moduleLessons
        };
      });
      
      setCourseModules(modules);
      
      // Находим текущий урок
      let foundLesson = null;
      
      for (const module of selectedCourse.modules) {
        const lesson = module.lessons.find(l => l.id === activeLessonId);
        if (lesson) {
          foundLesson = lesson;
          break;
        }
      }
      
      if (foundLesson) {
        setCurrentLesson(foundLesson);
        
        if (foundLesson.practice && foundLesson.practice.codeTemplate) {
          setCodeValue(foundLesson.practice.codeTemplate);
        }
      }
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    if (activeSection === "cert") {
      fetchUserPhoto();
    }
  }, [activeSection]);

  const fetchUserPhoto = async () => {
    try {
      setIsLoading(true);
      // Предполагается, что Flask API запущен на порту 5000
      const userId = localStorage.getItem('userId') || 1;
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/photo`);
      setUserPhoto(response.data.photoUrl);
    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
      // Устанавливаем placeholder в случае ошибки
      setUserPhoto("/api/placeholder/150/150");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCertificate = () => {
    const certificateElement = document.querySelector('.certificate');
    const footerElement = document.querySelector('.certificate-footer');
    
    if (!certificateElement || !footerElement) return;
    
    // Сохраняем оригинальное состояние видимости footer
    const originalDisplay = footerElement.style.display;
    
    // Временно скрываем footer с кнопками
    footerElement.style.display = 'none';
    
    // Создаем изображение сертификата без кнопок
    html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: false
    }).then(canvas => {
      // Возвращаем footer в исходное состояние
      footerElement.style.display = originalDisplay;
      
      // Создаем PDF из изображения
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentCourse.title}_certificate.pdf`);
    });
  };

  const downloadCertificateFromServer = async () => {
    try {
      const userId = localStorage.getItem('userId') || 1;
      // Вызываем API для генерации сертификата на сервере
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${userId}/${courseId}`,
        { responseType: 'blob' } // Важно для получения бинарных данных
      );
      
      // Создаем URL объект из полученных данных
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Создаем временную ссылку для скачивания файла
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${currentCourse.title}_certificate.pdf`);
      
      // Эмулируем клик по ссылке для скачивания
      document.body.appendChild(link);
      link.click();
      
      // Удаляем ссылку после использования
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании сертификата:", error);
      alert("Не удалось скачать сертификат. Пожалуйста, попробуйте позже.");
    }
  };
  
  // В JSX коде модифицируйте кнопку скачивания
  <button 
    className="btn-primary download-btn" 
    onClick={downloadCertificateFromServer} // Используем серверный метод скачивания
  >
    <Download size={16} />
    Скачать сертификат
  </button>
  // Обработчики событий
  const goToNextStep = () => {
    if (currentStep === 1) {
      setActiveSection("video");
      setCurrentStep(2);
      // Добавляем XP за просмотр введения
      setXp(xp + 25);
    } else if (currentStep === 2) {
      setActiveSection("practice");
      setCurrentStep(3);
      // Добавляем XP за просмотр видео
      setXp(xp + 25);
    } else if (currentStep === 3) {
      setActiveSection("test");
      setCurrentStep(4);
      // XP за практику уже добавлено при успешной проверке кода
    } else if (currentStep === 4) {
      setActiveSection("cert");
      setCurrentStep(5);
      // Добавляем значительное количество XP при получении сертификата
      setXp(xp + 350);
      setCourseCompleted(true);
    }
    
    updateProgress();
  };

  // Обработчик для кнопки "Лайк"
  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };
  
  // Обработчик для кнопки "Дизлайк"
  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1);
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } else {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    }
  };

  // Обработчик для добавления комментария
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Вы",
        avatar: "/api/placeholder/40/40",
        text: commentText,
        likes: 0,
        timestamp: "только что"
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  // Обработчик для проверки кода
  const submitCode = () => {
    // Простая проверка кода в зависимости от языка
    if (courseId === "python") {
      if (codeValue.includes("print_hello") && codeValue.includes("print(")) {
        setFeedback({
          success: true,
          message: "Отлично! Код прошел проверку."
        });
        setXp(xp + 75);
      } else {
        setFeedback({
          success: false,
          message: "В вашем коде есть ошибки. Проверьте функцию print_hello и вызов print()."
        });
      }
    } else if (courseId === "csharp") {
      if (codeValue.includes("SayHello") && codeValue.includes("Console.WriteLine")) {
        setFeedback({
          success: true,
          message: "Отлично! Код прошел проверку."
        });
        setXp(xp + 75);
      } else {
        setFeedback({
          success: false,
          message: "В вашем коде есть ошибки. Проверьте метод SayHello и вызов Console.WriteLine."
        });
      }
    } else {
      // Для других языков
      setFeedback({
        success: true,
        message: "Отлично! Код прошел проверку."
      });
      setXp(xp + 75);
    }
    
    updateProgress();
  };

  // Обработчик для проверки теста
  const completeTestSection = () => {
    if (!currentLesson || !currentLesson.test) return;
    
    // Проверка ответов
    let correctAnswers = 0;
    
    if (testAnswers.question1 === (currentLesson.test[0].correct + 1).toString()) correctAnswers++;
    if (testAnswers.question2 === (currentLesson.test[1].correct + 1).toString()) correctAnswers++;
    if (testAnswers.question3 === (currentLesson.test[2].correct + 1).toString()) correctAnswers++;
    
    setTestScore(correctAnswers);
    setTestSubmitted(true);
    
    // Если пройден тест, добавляем XP
    if (correctAnswers >= 2) {
      setXp(xp + 100);
      updateProgress();
    }
  };

  // Обработчик выбора ответа в тесте
  const handleAnswerChange = (question, value) => {
    setTestAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  // Обновление прогресса
  const updateProgress = () => {
    // Рассчитываем процент прогресса
    const newProgress = (xp / xpToNextLevel) * 100;
    setProgress(newProgress > 100 ? 100 : newProgress);
  };

  // Вычисление прогресса XP при изменении XP
  useEffect(() => {
    updateProgress();
  }, [xp, xpToNextLevel]);
  
  // Добавляем функцию для перехода между курсами
  const changeCourse = (newCourseId) => {
    navigate(`/course/${newCourseId}/lesson/1.1`);
  };
  
  // Добавляем функцию для перехода к другому уроку
  const goToLesson = (moduleId, lessonId) => {
    navigate(`/course/${courseId}/lesson/${lessonId}`);
    setMenuOpen(false);
  };
  
  // Если данные еще не загружены
  if (!currentCourse || !currentLesson) {
    return <div className="loading">Загрузка курса...</div>;
  }
  
  // Получаем список доступных курсов для селектора
  const availableCourses = Object.keys(courseStructures).map(id => ({
    id,
    title: courseStructures[id].title
  }));

  return (
    <div className="course-player-page">
      {/* Хедер */}
      <Header />

      {/* Основной контент */}
      <div className="player-content">
        {/* Боковая панель */}
        <aside className={`player-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <div className="course-info">
            <h2 className="course-title">{currentCourse.title}</h2>
            <div className="xp-container">
              <div className="xp-text">
                <span>Прогресс XP:</span>
                <span>{xp} / {xpToNextLevel}</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{width: `${progress}%`}}></div>
              </div>
            </div>
            
            {/* Селектор курса */}
            <div className="course-selector">
              <label htmlFor="coursePicker">Выбрать курс:</label>
              <select 
                id="coursePicker"
                value={courseId}
                onChange={(e) => changeCourse(e.target.value)}
                className="course-select"
              >
                {availableCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          
          
          <div className="course-navigation">
            {courseModules.map(module => (
              <div key={module.id} className="course-module">
                <div className="module-header">
                  <div className="module-number">{module.id}</div>
                  <div className="module-title">{module.title}</div>
                </div>
                <ul className="lesson-list">
                  {module.lessons.map(lesson => (
                    <li
                      key={lesson.id}
                      className={`lesson-item ${lesson.current ? 'current' : ''} ${lesson.completed ? 'completed' : ''}`}
                    >
                      <a 
                        className="lesson-link"
                        onClick={() => goToLesson(module.id, lesson.id)}
                      >
                        <span className="lesson-title">{lesson.title}</span>
                        {lesson.completed && <Check size={16} className="lesson-completed-icon" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Основное содержимое урока */}
        <main className="lesson-main">
          <div className="top-progress-bar">
            <div className="progress-fill" style={{width: `${progress}%`}}></div>
          </div>
          
          <div className="lesson-header">
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} />
            </button>
            <div className="lesson-info">
              <h1>{currentLesson.title}</h1>
              <span className="lesson-progress">Шаг {currentStep} из {totalSteps}</span>
            </div>
            <div className="section-tabs">
              <button 
                className={`section-tab ${activeSection === "intro" ? "active" : ""}`}
                onClick={() => setActiveSection("intro")}
                disabled={currentStep < 1}
              >
                Введение
              </button>
              <button 
                className={`section-tab ${activeSection === "video" ? "active" : ""}`}
                onClick={() => setActiveSection("video")}
                disabled={currentStep < 2}
              >
                Видео
              </button>
              <button 
                className={`section-tab ${activeSection === "practice" ? "active" : ""}`}
                onClick={() => setActiveSection("practice")}
                disabled={currentStep < 3}
              >
                Практика
              </button>
              <button 
                className={`section-tab ${activeSection === "test" ? "active" : ""}`}
                onClick={() => setActiveSection("test")}
                disabled={currentStep < 4}
              >
                Тест
              </button>
              <button 
                className={`section-tab ${activeSection === "cert" ? "active" : ""}`}
                onClick={() => setActiveSection("cert")}
                disabled={currentStep < 5}
              >
                Сертификат
              </button>
            </div>
          </div>
          
          <div className="section-content">
            {/* Содержимое урока в зависимости от активной секции */}
            
            {/* Введение */}
            {activeSection === "intro" && (
              <div className="intro-section">
                <h2 className="lesson-title">{currentLesson.intro.title}</h2>
                <div 
                  className="lesson-text"
                  dangerouslySetInnerHTML={{ __html: currentLesson.intro.content }}
                />
                <div className="lesson-actions">
                  <button className="btn-primary" onClick={goToNextStep}>
                    Продолжить
                  </button>
                </div>
              </div>
            )}

            {/* Видео */}
            {activeSection === "video" && (
              <div className="video-section">
                <h2 className="lesson-title">Видеоурок</h2>
                <div className="video-container">
                  <div className="video-content">
                    <img src="/api/placeholder/800/450" alt="Видеоурок" />
                    <div className="video-play-btn">▶</div>
                  </div>
                </div>
                <div className="video-description">
                  <h3>О чем этот урок</h3>
                  <p>
                    В этом видеоуроке мы рассмотрим основные концепции языка программирования 
                    и научимся писать простые программы. Вы узнаете о синтаксисе, переменных, 
                    типах данных и базовых операциях.
                  </p>
                </div>
                <div className="lesson-actions">
                  <button className="btn-primary" onClick={goToNextStep}>
                    Перейти к практике
                  </button>
                </div>
              </div>
            )}
            
            {/* Практика */}
            {activeSection === "practice" && (
              <div className="practice-section">
                <h2 className="lesson-title">Практическое задание</h2>
                <div className="practice-instructions">
                  <h3>Задание</h3>
                  <div dangerouslySetInnerHTML={{ __html: currentLesson.practice.instructions }} />
                </div>
                
                <div className="code-editor">
                  <textarea
                    value={codeValue}
                    onChange={(e) => setCodeValue(e.target.value)}
                    className="code-textarea"
                    spellCheck="false"
                  />
                </div>
                
                {feedback && (
                  <div className={`feedback ${feedback.success ? 'success' : 'error'}`}>
                    {feedback.success ? <Check size={20} /> : <XCircle size={20} />}
                    <p>{feedback.message}</p>
                  </div>
                )}
                
                <div className="lesson-actions">
                  <button className="btn-primary" onClick={submitCode}>
                    Проверить код
                  </button>
                  {feedback && feedback.success && (
                    <button className="btn-secondary" onClick={goToNextStep}>
                      Перейти к тесту
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Тест */}
            {activeSection === "test" && (
              <div className="test-section">
                <h2 className="lesson-title">Проверьте свои знания</h2>
                
                {!testSubmitted ? (
                  <div className="test-questions">
                    {currentLesson.test.map((question, index) => (
                      <div key={index} className="test-question">
                        <h3>{question.question}</h3>
                        <div className="answer-options">
                          {question.options.map((option, optIndex) => (
                            <label key={optIndex} className="answer-option">
                              <input 
                                type="radio"
                                name={`question${index + 1}`}
                                value={optIndex + 1}
                                checked={testAnswers[`question${index + 1}`] === (optIndex + 1).toString()}
                                onChange={() => handleAnswerChange(`question${index + 1}`, (optIndex + 1).toString())}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="lesson-actions">
                      <button 
                        className="btn-primary"
                        onClick={completeTestSection}
                        disabled={!testAnswers.question1 || !testAnswers.question2 || !testAnswers.question3}
                      >
                        Проверить результаты
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="test-results">
                    <h3>Ваш результат: {testScore} из 3</h3>
                    {testScore >= 2 ? (
                      <div className="success-message">
                        <p>Поздравляем! Вы успешно прошли тест.</p>
                        <div className="lesson-actions">
                          <button className="btn-primary" onClick={goToNextStep}>
                            Получить сертификат
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="error-message">
                        <p>К сожалению, вам нужно правильно ответить как минимум на 2 вопроса, чтобы пройти тест.</p>
                        <div className="lesson-actions">
                          <button 
                            className="btn-secondary"
                            onClick={() => {
                              setTestSubmitted(false);
                              setTestAnswers({
                                question1: "",
                                question2: "",
                                question3: ""
                              });
                              setTestScore(null);
                            }}
                          >
                            Попробовать снова
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Сертификация */}
            {activeSection === "cert" && (
      <div className="cert-section">
        <div className="certificate" id="certificate-container">
          <div className="certificate-header">
            <img className="cerflogo"src={cerflogo}></img>
            <h2 className="txt-cert">Сертфикат от Akatsuki Courses</h2>
          </div>
          
          <div className="certificate-body">
            <div className="user-photo-container">
              {isLoading ? (
                <div className="photo-loading">Загрузка фото...</div>
              ) : (
                <img 
                  src={userPhoto || "/api/placeholder/150/150"} 
                  alt="Фото пользователя" 
                  className="user-photo" 
                />
              )}
            </div>
            <p className="cert-text">Этот сертификат подтверждает, что</p>
            <p className="cert-name">Ученик</p>
            <p className="cert-text">успешно завершил курс</p>
            <p className="cert-course">{currentCourse.title}</p>
            <p className="cert-date">Дата выдачи: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="certificate-footer">
            <button className="btn-primary download-btn" onClick={downloadCertificate}>
              <Download size={16} />
              Скачать сертификат
            </button>
            <button className="btn-secondary">
              Поделиться
            </button>
          </div>
        </div>
                
               <div className="course-footer"> {/* Рекомендации для дальнейшего обучения */}
                <div className="next-steps">
                  <h3>Что дальше?</h3>
                  <p>Рекомендуем вам пройти следующие курсы для развития ваших навыков:</p>
                  
                  <div className="course-recommendations">
                    {availableCourses
                      .filter(course => course.id !== courseId)
                      .slice(0, 3)
                      .map(course => (
                        <div key={course.id} className="recommended-course">
                          <h4>{course.title}</h4>
                          <button 
                            className="btn-outline"
                            onClick={() => changeCourse(course.id)}
                          >
                            Начать
                          </button>
                        </div>
                      ))}
                  </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Комментарии */}
            <div className="comments-section">
              <h3>
                <MessageSquare size={20} />
                Комментарии
              </h3>
              
              <div className="add-comment">
                <div className="comment-header">
                  <div className="comment-avatar">
                    <img src="/api/placeholder/40/40" alt="Ваш аватар" />
                  </div>
                  <div className="comment-input-container">
                    <textarea 
                      className="comment-input"
                      placeholder="Оставьте комментарий или задайте вопрос..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="comment-submit">
                      <button 
                        className="submit-button"
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="comments-list">
                {comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">
                      <img src={comment.avatar} alt={comment.author} />
                    </div>
                    <div className="comment-content">
                      <div className="comment-meta">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{comment.timestamp}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <div className="comment-actions">
                        <button className="rating-btn">
                          <ThumbsUp size={16} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="rating-btn">
                          Ответить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Рейтинг урока */}
            <div className="engagement-section">
              <h3>Оцените урок</h3>
              <div className="rating-buttons">
                <button 
                  className={`rating-btn ${liked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={20} />
                  <span>{likeCount}</span>
                </button>
                <button 
                  className={`rating-btn ${disliked ? 'active' : ''}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={20} />
                  <span>{dislikeCount}</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePlayerPage;


