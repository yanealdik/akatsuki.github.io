import React, { useState,} from "react";
import { 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Menu, 
  X, 
  Check 
} from "lucide-react";
import "./CourseLessonPage.css"; // Импортируем стили для страницы курса

const CourseLessonPage = () => {
  // Состояния для интерактивных элементов
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Модули курса
  const courseModules = [
    {
      id: 1,
      title: "Основы Python",
      completed: true,
      lessons: [
        { id: "1.1", title: "Введение в курс", completed: true, current: true },
        { id: "1.2", title: "Установка Python", completed: true },
        { id: "1.3", title: "Первая программа", completed: false },
      ]
    },
    {
      id: 2,
      title: "Базовые конструкции",
      completed: false,
      lessons: [
        { id: "2.1", title: "Переменные и типы данных", completed: false },
        { id: "2.2", title: "Операторы и выражения", completed: false },
        { id: "2.3", title: "Условные конструкции", completed: false },
      ]
    },
    {
      id: 3,
      title: "Циклы и функции",
      completed: false,
      lessons: [
        { id: "3.1", title: "Цикл for", completed: false },
        { id: "3.2", title: "Цикл while", completed: false },
        { id: "3.3", title: "Функции", completed: false },
      ]
    }
  ];

  // Обработчики событий
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

  // Информация о прогрессе
  const progressPercentage = 30;
  const completedSteps = 2;
  const totalSteps = 12;

  return (
    <div className="course-page">
      {/* Header */}
      <header className="course-header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo">A</div>
            <span className="logo-text">Akatsuki</span>
          </div>
          <button 
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="course-content">
        {/* Sidebar */}
        <aside className={`course-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
          <div className="course-info">
            <h2 className="course-title">Python для начинающих</h2>
            <div className="progress-container">
              <div className="progress-text">
                <span>Прогресс:</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
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
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="lesson-content">
          {/* Progress bar */}
          <div className="top-progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          {/* Course navigation */}
          <div className="lesson-header">
            <div className="lesson-info">
              <span>1.1 Введение в курс</span>
              <span className="lesson-progress">{completedSteps} из {totalSteps} шагов</span>
            </div>
            <div className="lesson-actions">
              <button className="action-button">Оставить отзыв</button>
            </div>
          </div>

          <div className="lesson-container">
            <h1 className="lesson-title">Добро пожаловать в мир Python!</h1>
            
            <div className="lesson-text">
              <p>
                Рады приветствовать вас на курсе "Python для начинающих". Этот курс разработан для тех, 
                кто хочет освоить основы программирования на одном из самых популярных и доступных языков.
              </p>
              <p>
                Python — современный язык программирования, который отличается простым синтаксисом и 
                широкими возможностями. Он используется в веб-разработке, анализе данных, машинном обучении, 
                научных исследованиях и многих других областях.
              </p>
              <p>
                На этом курсе вы научитесь:
              </p>
              <ul>
                <li>Писать код на Python</li>
                <li>Работать с данными разных типов</li>
                <li>Создавать собственные функции</li>
                <li>Разрабатывать простые программы</li>
              </ul>
              <p>
                Для перехода к следующему шагу нажмите кнопку "Далее".
              </p>
            </div>

            {/* Reactions */}
            <div className="lesson-reactions">
              <div className="reaction-buttons">
                <button 
                  className={`reaction-button ${liked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={18} />
                  <span>{likeCount}</span>
                </button>
                <button 
                  className={`reaction-button ${disliked ? "disliked" : ""}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={18} />
                  <span>{dislikeCount}</span>
                </button>
              </div>
              
              <div className="step-indicator">
                <span>Шаг 1</span>
              </div>
              
              <div className="next-button-container">
                <button className="next-button">
                  <span>Далее</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="comments-section">
              <div className="comments-header">
                <div className="comments-title">
                  <MessageSquare size={18} />
                  <h3>Комментарии</h3>
                  <span className="comments-count">{comments.length}</span>
                </div>
                <div className="comments-sort">
                  <span>По популярности</span>
                </div>
              </div>
              
              <div className="comment-form">
                <div className="comment-avatar">АВ</div>
                <div className="comment-input-container">
                  <textarea
                    className="comment-input"
                    placeholder="Ваш комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <div className="comment-submit">
                    <button 
                      className="submit-button"
                      disabled={!commentText.trim()}
                      onClick={handleAddComment}
                    >
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="comments-list">
                {comments.map((comment) => (
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
                        <button className="comment-like">
                          <ThumbsUp size={14} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="comment-reply">
                          Ответить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="show-more">
                <button className="show-more-button">
                  Показать все комментарии (42)
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseLessonPage;