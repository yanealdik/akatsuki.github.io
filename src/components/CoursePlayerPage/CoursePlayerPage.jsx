import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  X
} from "lucide-react";
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
  const [xp, setXp] = useState(150);
  const [xpToNextLevel, setXpToNextLevel] = useState(1000);
  const [codeValue, setCodeValue] = useState(`function sayHello() {\n  console.log("Привет, мир!");\n}\n\n// Вызов функции\nsayHello();`);
  const [feedback, setFeedback] = useState(null);
  const [testAnswers, setTestAnswers] = useState({
    question1: "",
    question2: "",
    question3: ""
  });
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [courseCompleted, setCourseCompleted] = useState(false);
  
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
    
    // C++
    cpp: {
      title: "C++: Полный Курс",
      modules: [
        {
          id: 1,
          title: "Основы C++",
          lessons: [
            { 
              id: "1.1", 
              title: "Введение в C++",
              intro: {
                title: "Добро пожаловать в мир C++!",
                content: `
                  <p>
                    Рады приветствовать вас на курсе "C++: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить основы программирования на мощном и эффективном языке.
                  </p>
                  <p>
                    C++ — язык программирования, который сочетает возможность низкоуровневого управления памятью 
                    и высокий уровень абстракции. Он используется в разработке игр, системного ПО, встраиваемых систем и многого другого.
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Писать код на C++</li>
                    <li>Работать с указателями и управлением памяти</li>
                    <li>Использовать ООП и шаблоны</li>
                    <li>Создавать эффективные и производительные программы</li>
                  </ul>
                `
              },
              practice: {
                instructions: "Создайте функцию <code>sayHello()</code>, которая выводит 'Привет, мир!' в консоль. Затем вызовите эту функцию в функции main.",
                codeTemplate: `#include <iostream>
  
  // Ваша функция здесь
  
  int main() {
      // Вызов функции
      
      return 0;
  }`
              },
              test: [
                {
                  question: "Какая библиотека используется для ввода/вывода в C++?",
                  options: ["stdio.h", "iostream", "io.h"],
                  correct: 1
                },
                {
                  question: "Что такое STL в C++?",
                  options: ["Standard Template Library", "System Type Library", "String Type List"],
                  correct: 0
                },
                {
                  question: "Как обозначается указатель в C++?",
                  options: ["@", "*", "&"],
                  correct: 1
                }
              ]
            }
          ]
        }
      ]
    },
    
    // React
    react: {
      title: "React: Полный Курс",
      modules: [
        {
          id: 1,
          title: "Основы React",
          lessons: [
            { 
              id: "1.1", 
              title: "Введение в React",
              intro: {
                title: "Добро пожаловать в мир React!",
                content: `
                  <p>
                    Рады приветствовать вас на курсе "React: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить современную библиотеку для создания пользовательских интерфейсов.
                  </p>
                  <p>
                    React — библиотека JavaScript, разработанная Facebook, которая позволяет создавать 
                    интерактивные пользовательские интерфейсы. Она используется для разработки одностраничных приложений,
                    мобильных приложений и многого другого.
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Создавать компоненты React</li>
                    <li>Работать с состоянием и жизненным циклом</li>
                    <li>Использовать хуки и контекст</li>
                    <li>Разрабатывать современные интерфейсы</li>
                  </ul>
                `
              },
              practice: {
                instructions: "Создайте функциональный компонент <code>HelloWorld</code>, который возвращает элемент с текстом 'Привет, мир!'.",
                codeTemplate: `import React from 'react';
  
  // Ваш компонент здесь
  
  export default HelloWorld;`
              },
              test: [
                {
                  question: "Что такое JSX?",
                  options: ["JavaScript XML", "Java Syntax Extension", "JSON XML"],
                  correct: 0
                },
                {
                  question: "Какой хук используется для управления состоянием в функциональном компоненте?",
                  options: ["useEffect", "useState", "useContext"],
                  correct: 1
                },
                {
                  question: "Что такое виртуальный DOM?",
                  options: ["Новая версия DOM API", "JavaScript-представление реального DOM", "Тип анимации в React"],
                  correct: 1
                }
              ]
            }
          ]
        }
      ]
    },
    
    // HTML & CSS
    htmlcss: {
      title: "HTML & CSS: Полный Курс",
      modules: [
        {
          id: 1,
          title: "Основы HTML и CSS",
          lessons: [
            { 
              id: "1.1", 
              title: "Введение в HTML и CSS",
              intro: {
                title: "Добро пожаловать в мир веб-разработки!",
                content: `
                  <p>
                    Рады приветствовать вас на курсе "HTML & CSS: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить основы фронтенд-разработки и верстки сайтов.
                  </p>
                  <p>
                    HTML и CSS — это основные языки, используемые для создания веб-страниц. HTML отвечает за структуру,
                    а CSS — за оформление и стиль веб-страниц.
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Создавать структуру страницы с помощью HTML</li>
                    <li>Стилизовать страницы с помощью CSS</li>
                    <li>Создавать адаптивные дизайны</li>
                    <li>Работать с современными фреймворками CSS</li>
                  </ul>
                `
              },
              practice: {
                instructions: "Создайте HTML-страницу с заголовком 'Мой первый сайт' и абзацем с текстом 'Привет, мир!'. Стилизуйте заголовок с помощью CSS, чтобы он был синего цвета.",
                codeTemplate: `<!DOCTYPE html>
  <html>
  <head>
      <title>Мой первый сайт</title>
      <style>
          /* Ваши стили здесь */
          
      </style>
  </head>
  <body>
      <!-- Ваш HTML-код здесь -->
      
  </body>
  </html>`
              },
              test: [
                {
                  question: "Для чего используется тег <DOCTYPE>?",
                  options: ["Для указания версии HTML", "Для задания типа документа", "Для описания документа"],
                  correct: 1
                },
                {
                  question: "Какое свойство CSS используется для изменения цвета текста?",
                  options: ["text-color", "color", "font-color"],
                  correct: 1
                },
                {
                  question: "Что такое CSS Box Model?",
                  options: ["Модель позиционирования элементов", "Коробочная модель, включающая margin, border, padding и content", "Метод создания сеток на странице"],
                  correct: 1
                }
              ]
            }
          ]
        }
      ]
    }
  };
  
  // Модули и уроки курса
  const courseModules = [
    {
      id: 1,
      title: "Основы JavaScript",
      completed: true,
      lessons: [
        { id: "1.1", title: "Введение в JavaScript", completed: true, current: true },
      ]
    },
  ];

  // Обработчики событий
  
  // Обработчик для перехода к следующему шагу
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
      // Поскольку это последний урок, начисляем полное количество XP
      setXp(xp + 350); // Больше XP, так как это финальный шаг
      setCourseCompleted(true); // Отмечаем курс как завершенный
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
    // Простая проверка кода
    if (codeValue.includes("console.log") && codeValue.includes("sayHello")) {
      setFeedback({
        success: true,
        message: "Отлично! Код прошел проверку."
      });
      setXp(xp + 75);
      updateProgress();
    } else {
      setFeedback({
        success: false,
        message: "В вашем коде есть ошибки. Проверьте функцию sayHello и вызов console.log."
      });
    }
  };
  
  // Обработчик для проверки теста
  const completeTestSection = () => {
    // Проверка ответов
    let correctAnswers = 0;
    if (testAnswers.question1 === "2") correctAnswers++;
    if (testAnswers.question2 === "1") correctAnswers++;
    if (testAnswers.question3 === "3") correctAnswers++;
    
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

  return (
    <div className="course-player-page">
      {/* Хедер */}
      <header className="player-header">
        <Header />
      </header>

      {/* Основной контент */}
      <div className="player-content">
        {/* Боковая панель */}
        <aside className={`player-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <div className="course-info">
            <h2 className="course-title">JavaScript: Полный Курс</h2>
            <div className="xp-container">
              <div className="xp-text">
                <span>XP: {xp}/{xpToNextLevel}</span>
                <span>Уровень 2</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <nav className="course-navigation">
            {courseModules.map((module) => (
              <div key={module.id} className="course-module">
                <div className="module-header">
                  <span className="module-number">{module.id}</span>
                  <span className="module-title">{module.title}</span>
                </div>
                <ul className="lesson-list">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className={`lesson-item ${lesson.current ? "current" : ""} ${lesson.completed ? "completed" : ""}`}>
                      <a href="#" className="lesson-link">
                        <span className="lesson-title">{lesson.title}</span>
                        {lesson.completed && !lesson.current && (
                          <Check size={16} className="lesson-completed-icon" />
                        )}
                      </a>
                      {lesson.current && (
                        <ul className="lesson-steps">
                          <li 
                            className={`lesson-step ${activeSection === "intro" ? "active" : activeSection !== "intro" ? "completed" : ""}`}
                            onClick={() => {setActiveSection("intro"); setCurrentStep(1);}}
                          >
                            Введение
                            {activeSection !== "intro" && <Check size={12} className="step-completed-icon" />}
                          </li>
                          <li 
                            className={`lesson-step ${activeSection === "video" ? "active" : currentStep > 2 ? "completed" : ""}`}
                            onClick={() => {
                              if (currentStep >= 2) {
                                setActiveSection("video");
                                setCurrentStep(2);
                              }
                            }}
                          >
                            Видеообучение
                            {currentStep > 2 && <Check size={12} className="step-completed-icon" />}
                          </li>
                          <li 
                            className={`lesson-step ${activeSection === "practice" ? "active" : currentStep > 3 ? "completed" : ""}`}
                            onClick={() => {
                              if (currentStep >= 3) {
                                setActiveSection("practice");
                                setCurrentStep(3);
                              }
                            }}
                          >
                            Практика
                            {currentStep > 3 && <Check size={12} className="step-completed-icon" />}
                          </li>
                          <li 
                            className={`lesson-step ${activeSection === "test" ? "active" : currentStep > 4 ? "completed" : ""}`}
                            onClick={() => {
                              if (currentStep >= 4) {
                                setActiveSection("test");
                                setCurrentStep(4);
                              }
                            }}
                          >
                            Тестирование
                            {currentStep > 4 && <Check size={12} className="step-completed-icon" />}
                          </li>
                          <li 
                            className={`lesson-step ${activeSection === "cert" ? "active" : ""}`}
                            onClick={() => {
                              if (currentStep >= 5) {
                                setActiveSection("cert");
                                setCurrentStep(5);
                              }
                            }}
                          >
                            Сертификация
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Основной контент урока */}
        <main className="lesson-main">
          {/* Прогресс-бар */}
          <div className="top-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Навигация урока */}
          <div className="lesson-header">
            <div className="lesson-info">
              <span>1.1 Введение в JavaScript</span>
              <span className="lesson-progress">Шаг {currentStep} из {totalSteps}</span>
            </div>
            <div className="section-tabs">
              <button 
                className={`section-tab ${activeSection === "intro" ? "active" : ""}`}
                onClick={() => {setActiveSection("intro"); setCurrentStep(1);}}
              >
                Введение
              </button>
              <button 
                className={`section-tab ${activeSection === "video" ? "active" : ""}`}
                onClick={() => {
                  if (currentStep >= 2) {
                    setActiveSection("video");
                    setCurrentStep(2);
                  }
                }}
                disabled={currentStep < 2}
              >
                Видеообучение
              </button>
              <button 
                className={`section-tab ${activeSection === "practice" ? "active" : ""}`}
                onClick={() => {
                  if (currentStep >= 3) {
                    setActiveSection("practice");
                    setCurrentStep(3);
                  }
                }}
                disabled={currentStep < 3}
              >
                Практика
              </button>
              <button 
                className={`section-tab ${activeSection === "test" ? "active" : ""}`}
                onClick={() => {
                  if (currentStep >= 4) {
                    setActiveSection("test");
                    setCurrentStep(4);
                  }
                }}
                disabled={currentStep < 4}
              >
                Тестирование
              </button>
              <button 
                className={`section-tab ${activeSection === "cert" ? "active" : ""}`}
                onClick={() => {
                  if (currentStep >= 5) {
                    setActiveSection("cert");
                    setCurrentStep(5);
                  }
                }}
                disabled={currentStep < 5}
              >
                Сертификация
              </button>
            </div>
          </div>

          <div className="section-content">
            {/* Секция введения */}
            {activeSection === "intro" && (
              <div className="intro-section lesson-container">
                <h1 className="lesson-title">Добро пожаловать в мир JavaScript!</h1>
                
                <div className="lesson-text">
                  <p>
                    Рады приветствовать вас на курсе "JavaScript: Полный Курс". Этот курс разработан для тех, 
                    кто хочет освоить основы программирования на одном из самых популярных языков веб-разработки.
                  </p>
                  <p>
                    JavaScript — современный язык программирования, который отличается гибкостью и 
                    широкими возможностями. Он используется в веб-разработке для создания интерактивных сайтов,
                    в разработке мобильных приложений, серверной разработке и многих других областях.
                  </p>
                  <p>
                    На этом курсе вы научитесь:
                  </p>
                  <ul>
                    <li>Писать код на JavaScript</li>
                    <li>Работать с переменными и типами данных</li>
                    <li>Создавать функции и использовать объекты</li>
                    <li>Манипулировать DOM-элементами</li>
                    <li>Работать с асинхронным кодом и API</li>
                  </ul>
                </div>
                
                <div className="lesson-actions">
                  <button className="btn-primary" onClick={goToNextStep}>
                    Продолжить
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Секция видеоурока */}
            {activeSection === "video" && (
              <div className="video-section lesson-container">
                <h2 className="section-title">Видеоурок: Основы JavaScript</h2>
                
                <div className="video-container">
                  <div className="video-placeholder">
                    <div className="video-content">
                      <img src="/api/placeholder/640/360" alt="Видеоурок по JavaScript" />
                      <div className="video-play-btn">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="video-description">
                  <h3>О чем этот урок:</h3>
                  <p>
                    В этом видеоуроке мы познакомимся с основами языка JavaScript — 
                    его историей, предназначением и ключевыми концепциями. Вы узнаете о переменных, 
                    типах данных, операторах и базовых структурах кода.
                  </p>
                  <p>
                    Длительность: 15 минут
                  </p>
                </div>
                
                <div className="engagement-section">
                  <div className="rating-buttons">
                    <button 
                      className={`rating-btn ${liked ? "active" : ""}`} 
                      onClick={handleLike}
                    >
                      <ThumbsUp size={18} />
                      <span>{likeCount}</span>
                    </button>
                    <button 
                      className={`rating-btn ${disliked ? "active" : ""}`} 
                      onClick={handleDislike}
                    >
                      <ThumbsDown size={18} />
                      <span>{dislikeCount}</span>
                    </button>
                  </div>
                  
                  <div className="comments-section">
                    <h3><MessageSquare size={18} /> Комментарии ({comments.length})</h3>
                    
                    <div className="comment-input">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Оставьте комментарий..."
                      />
                      <button 
                        className="btn-primary comment-btn"
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                      >
                        Отправить
                      </button>
                    </div>
                    
                    <div className="comments-list">
                      {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <div className="comment-header">
                            <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                            <div className="comment-meta">
                              <span className="comment-author">{comment.author}</span>
                              <span className="comment-time">{comment.timestamp}</span>
                            </div>
                          </div>
                          <div className="comment-body">
                            {comment.text}
                          </div>
                          <div className="comment-footer">
                            <button className="comment-like">
                              <ThumbsUp size={14} />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lesson-actions">
                  <button className="btn-primary" onClick={goToNextStep}>
                    Продолжить к практике
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Секция практики */}
            {activeSection === "practice" && (
              <div className="practice-section lesson-container">
                <h2 className="section-title">Практическое задание</h2>
                
                <div className="task-description">
                  <p>
                    Создайте функцию <code>sayHello()</code>, которая выводит 'Привет, мир!' в консоль.
                    Затем вызовите эту функцию.
                  </p>
                </div>
                
                <div className="code-editor">
                  <textarea 
                    value={codeValue}
                    onChange={(e) => setCodeValue(e.target.value)}
                    className="code-textarea"
                  />
                </div>
                
                <div className="code-actions">
                  <button className="btn-primary" onClick={submitCode}>
                    Проверить решение
                  </button>
                </div>
                
                {feedback && (
                  <div className={`feedback-message ${feedback.success ? "success" : "error"}`}>
                    {feedback.success ? <CheckSquare size={18} /> : <XCircle size={18} />}
                    <span>{feedback.message}</span>
                  </div>
                )}
                
                {feedback && feedback.success && (
                  <div className="lesson-actions">
                    <button className="btn-primary" onClick={goToNextStep}>
                      Продолжить к тесту
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Секция тестирования */}
            {activeSection === "test" && (
              <div className="test-section lesson-container">
                <h2 className="section-title">Проверка знаний</h2>
                
                <div className="test-description">
                  <p>
                    Ответьте на следующие вопросы, чтобы проверить свои знания по основам JavaScript.
                    Для прохождения теста необходимо правильно ответить минимум на 2 из 3 вопросов.
                  </p>
                </div>
                
                <div className="test-questions">
                  <div className="test-question">
                    <p className="question-text">1. Какой тип данных вернет выражение typeof([]) в JavaScript?</p>
                    <div className="question-options">
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question1" 
                          value="1" 
                          checked={testAnswers.question1 === "1"}
                          onChange={() => handleAnswerChange("question1", "1")} 
                          disabled={testSubmitted}
                        />
                        <span>array</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question1" 
                          value="2" 
                          checked={testAnswers.question1 === "2"}
                          onChange={() => handleAnswerChange("question1", "2")} 
                          disabled={testSubmitted}
                        />
                        <span>object</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question1" 
                          value="3" 
                          checked={testAnswers.question1 === "3"}
                          onChange={() => handleAnswerChange("question1", "3")} 
                          disabled={testSubmitted}
                        />
                        <span>undefined</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="test-question">
                    <p className="question-text">2. Какой метод используется для добавления элемента в конец массива?</p>
                    <div className="question-options">
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question2" 
                          value="1" 
                          checked={testAnswers.question2 === "1"}
                          onChange={() => handleAnswerChange("question2", "1")} 
                          disabled={testSubmitted}
                        />
                        <span>push()</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question2" 
                          value="2" 
                          checked={testAnswers.question2 === "2"}
                          onChange={() => handleAnswerChange("question2", "2")} 
                          disabled={testSubmitted}
                        />
                        <span>append()</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question2" 
                          value="3" 
                          checked={testAnswers.question2 === "3"}
                          onChange={() => handleAnswerChange("question2", "3")} 
                          disabled={testSubmitted}
                        />
                        <span>add()</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="test-question">
                    <p className="question-text">3. Какой оператор используется для строгого сравнения в JavaScript?</p>
                    <div className="question-options">
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question3" 
                          value="1" 
                          checked={testAnswers.question3 === "1"}
                          onChange={() => handleAnswerChange("question3", "1")} 
                          disabled={testSubmitted}
                        />
                        <span>==</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question3" 
                          value="2" 
                          checked={testAnswers.question3 === "2"}
                          onChange={() => handleAnswerChange("question3", "2")} 
                          disabled={testSubmitted}
                        />
                        <span>=</span>
                      </label>
                      <label className="option">
                        <input 
                          type="radio" 
                          name="question3" 
                          value="3" 
                          checked={testAnswers.question3 === "3"}
                          onChange={() => handleAnswerChange("question3", "3")} 
                          disabled={testSubmitted}
                        />
                        <span>===</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {!testSubmitted ? (
                  <div className="test-actions">
                    <button 
                      className="btn-primary" 
                      onClick={completeTestSection}
                      disabled={!testAnswers.question1 || !testAnswers.question2 || !testAnswers.question3}
                    >
                      Завершить тест
                    </button>
                  </div>
                ) : (
                  <div className="test-results">
                    <div className={`test-score ${testScore >= 2 ? "passed" : "failed"}`}>
                      {testScore >= 2 ? (
                        <>
                          <CheckSquare size={24} />
                          <span>Поздравляем! Вы правильно ответили на {testScore} из 3 вопросов.</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={24} />
                          <span>Вы ответили правильно только на {testScore} из 3 вопросов. Попробуйте еще раз!</span>
                        </>
                      )}
                    </div>
                    
                    {testScore >= 2 && (
                      <div className="lesson-actions">
                        <button className="btn-primary" onClick={goToNextStep}>
                          Получить сертификат
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                    
                    {testScore < 2 && (
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
                        Пройти тест заново
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Секция сертификации */}
            {activeSection === "cert" && (
              <div className="cert-section lesson-container">
                <h2 className="section-title">Поздравляем с завершением курса!</h2>
                
                <div className="certificate-container">
                  <div className="certificate">
                    <h3 className="certificate-title">Сертификат</h3>
                    <div className="certificate-content">
                      <Award size={64} className="certificate-icon" />
                      <p className="certificate-text">Настоящим подтверждается, что</p>
                      <h4 className="certificate-name">Студент Кодер</h4>
                      <p className="certificate-text">успешно завершил(а) курс</p>
                      <h5 className="certificate-course">JavaScript: Полный Курс</h5>
                      <p className="certificate-date">22 апреля 2025 г.</p>
                    </div>
                  </div>
                </div>
                
                <div className="certificate-actions">
                  <button className="btn-primary">
                    Скачать сертификат
                  </button>
                  <button className="btn-secondary" onClick={() => navigate("/courses")}>
                    Вернуться к списку курсов
                  </button>
                </div>
                
                <div className="completion-summary">
                  <h3>Ваши достижения:</h3>
                  <ul className="achievements-list">
                    <li className="achievement-item">
                      <CheckSquare size={18} />
                      <span>Основы JavaScript</span>
                    </li>
                    <li className="achievement-item">
                      <CheckSquare size={18} />
                      <span>Работа с функциями</span>
                    </li>
                    <li className="achievement-item">
                      <CheckSquare size={18} />
                      <span>Манипуляция DOM</span>
                    </li>
                  </ul>
                  
                  <h3>Рекомендуемые курсы:</h3>
                  <div className="recommended-courses">
                    <div className="course-card">
                      <img src="/api/placeholder/120/80" alt="React курс" className="course-thumbnail" />
                      <div className="course-info">
                        <h4>React: Полный Курс</h4>
                        <button className="btn-outline">Начать курс</button>
                      </div>
                    </div>
                    <div className="course-card">
                      <img src="/api/placeholder/120/80" alt="Node.js курс" className="course-thumbnail" />
                      <div className="course-info">
                        <h4>Node.js: Основы backend-разработки</h4>
                        <button className="btn-outline">Начать курс</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Мобильная кнопка меню */}
      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default CoursePlayerPage;