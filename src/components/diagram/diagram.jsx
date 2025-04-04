// diagram.jsx - Улучшенная версия
import React, { useState, useEffect, useRef } from 'react';
import './diagram.css';

const ProgrammingLearningTree = () => {
  const [expandedNodes, setExpandedNodes] = useState([1]); // Начинаем с развернутого корневого узла
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Обработка изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Данные для дерева обучения
  const treeData = {
    1: {
      id: 1,
      title: "Основы программирования",
      description: "Фундаментальные концепции алгоритмов и логики",
      technologies: [
        { name: "Алгоритмы", icon: "🧩" },
        { name: "Структуры данных", icon: "📊" },
        { name: "Логика", icon: "🧠" }
      ],
      children: [2, 3, 4],
    },
    2: {
      id: 2,
      title: "Веб-разработка",
      description: "Создание интерактивных веб-сайтов и приложений",
      technologies: [
        { name: "HTML/CSS", icon: "🌐" },
        { name: "JavaScript", icon: "💻" },
        { name: "React", icon: "⚛️" }
      ],
      children: [5, 6],
    },
    3: {
      id: 3,
      title: "Мобильная разработка",
      description: "Создание приложений для iOS и Android",
      technologies: [
        { name: "React Native", icon: "📱" },
        { name: "Swift", icon: "🍎" },
        { name: "Kotlin", icon: "🤖" }
      ],
      children: [7],
    },
    4: {
      id: 4,
      title: "Разработка игр",
      description: "Создание интерактивных игр и симуляций",
      technologies: [
        { name: "Unity", icon: "🎮" },
        { name: "C#", icon: "🎯" },
        { name: "Unreal Engine", icon: "🎲" }
      ],
      children: [8],
    },
    5: {
      id: 5,
      title: "Frontend",
      description: "Пользовательский интерфейс и интерактивность",
      technologies: [
        { name: "React", icon: "⚛️" },
        { name: "Vue.js", icon: "🟢" },
        { name: "Angular", icon: "🔴" }
      ],
      children: [9, 10],
    },
    6: {
      id: 6,
      title: "Backend",
      description: "Серверная логика и базы данных",
      technologies: [
        { name: "Node.js", icon: "📦" },
        { name: "Python Django", icon: "🐍" },
        { name: "SQL", icon: "🗄️" }
      ],
      children: [11, 12],
    },
    7: {
      id: 7,
      title: "Кросс-платформенная разработка",
      description: "Создание приложений для нескольких платформ",
      technologies: [
        { name: "Flutter", icon: "💙" },
        { name: "React Native", icon: "📱" },
        { name: "Xamarin", icon: "⚒️" }
      ],
      children: [],
    },
    8: {
      id: 8,
      title: "3D моделирование",
      description: "Создание 3D-моделей и анимаций",
      technologies: [
        { name: "Blender", icon: "🎭" },
        { name: "Maya", icon: "🏗️" },
        { name: "ZBrush", icon: "🖌️" }
      ],
      children: [],
    },
    9: {
      id: 9,
      title: "UX/UI дизайн",
      description: "Проектирование пользовательского опыта",
      technologies: [
        { name: "Figma", icon: "🎨" },
        { name: "Adobe XD", icon: "📝" },
        { name: "Sketch", icon: "✏️" }
      ],
      children: [],
    },
    10: {
      id: 10,
      title: "Тестирование",
      description: "Обеспечение качества пользовательского интерфейса",
      technologies: [
        { name: "Jest", icon: "🧪" },
        { name: "Cypress", icon: "🧰" },
        { name: "Selenium", icon: "🔍" }
      ],
      children: [],
    },
    11: {
      id: 11,
      title: "Базы данных",
      description: "Хранение и управление данными",
      technologies: [
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Redis", icon: "🔄" }
      ],
      children: [],
    },
    12: {
      id: 12,
      title: "DevOps",
      description: "Автоматизация и развертывание",
      technologies: [
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "🚢" },
        { name: "CI/CD", icon: "🔄" }
      ],
      children: [],
    }
  };
  
  // Переключение раскрытия узла
  const toggleNode = (nodeId) => {
    if (expandedNodes.includes(nodeId)) {
      // Сворачиваем этот узел и все его потомки
      const nodeToCollapse = [nodeId];
      const collapseDescendants = (parentId) => {
        const node = treeData[parentId];
        if (node && node.children) {
          node.children.forEach(childId => {
            nodeToCollapse.push(childId);
            collapseDescendants(childId);
          });
        }
      };
      collapseDescendants(nodeId);
      setExpandedNodes(prev => prev.filter(id => !nodeToCollapse.includes(id)));
    } else {
      // Разворачиваем только этот узел
      setExpandedNodes(prev => [...prev, nodeId]);
    }
  };
  
  // Определяем, должен ли узел быть видимым на основе состояния расширения родителя
  const isNodeVisible = (nodeId) => {
    // Корневой узел всегда видим
    if (nodeId === 1) return true;
    
    // Находим родительский узел
    const parentId = Object.keys(treeData).find(id => 
      treeData[id].children.includes(nodeId)
    );
    
    // Узел видим, если родитель развернут и виден
    return parentId && expandedNodes.includes(Number(parentId)) && isNodeVisible(Number(parentId));
  };
  
  // Рассчитываем точки соединения для линий SVG
  const getConnectionPoints = (parentId, childId) => {
    const parentNode = document.getElementById(`node-${parentId}`);
    const childNode = document.getElementById(`node-${childId}`);
    
    if (!parentNode || !childNode || !containerRef.current) return null;
    
    const parentRect = parentNode.getBoundingClientRect();
    const childRect = childNode.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    return {
      x1: parentRect.left + parentRect.width / 2 - containerRect.left,
      y1: parentRect.top + parentRect.height - containerRect.top,
      x2: childRect.left + childRect.width / 2 - containerRect.left,
      y2: childRect.top - containerRect.top
    };
  };
  
  // Отрисовка соединений SVG между узлами
  const renderConnections = () => {
    const connections = [];
    
    Object.values(treeData).forEach(node => {
      if (expandedNodes.includes(node.id)) {
        node.children.forEach(childId => {
          if (isNodeVisible(childId)) {
            const points = getConnectionPoints(node.id, childId);
            if (points) {
              connections.push(
                <path
                  key={`${node.id}-${childId}`}
                  d={`M${points.x1},${points.y1} C${points.x1},${points.y1 + 50} ${points.x2},${points.y2 - 50} ${points.x2},${points.y2}`}
                  className="diagram-connection"
                />
              );
            }
          }
        });
      }
    });
    
    return (
      <svg className="diagram-svg">
        {connections}
      </svg>
    );
  };
  
  // Эффект для обновления соединений при изменении окна
  useEffect(() => {
    const updateConnections = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', updateConnections);
    updateConnections(); // Начальный вызов
    
    return () => {
      window.removeEventListener('resize', updateConnections);
    };
  }, [expandedNodes]);
  
  // Рендерим дерево
  return (
    <div className="learning-path-container">
      <div className="learning-path-wrapper">
        <div className="learning-path-header">
          <h1 className="learning-path-title">ПУТЬ ПРОГРАММИСТА</h1>
          <p className="learning-path-description">
            «Шаг за шагом, строка за строкой — на пути к мастерству программирования»
          </p>
        </div>
        
        <div className="learning-section-title">КАК ПРОХОДИТ ОБУЧЕНИЕ?</div>
        
        <div className="learning-tree-container" ref={containerRef}>
          {renderConnections()}
          
          <div className="learning-tree">
            {Object.values(treeData).map(node => (
              isNodeVisible(node.id) && (
                <div
                  key={node.id}
                  id={`node-${node.id}`}
                  className={`learning-node ${expandedNodes.includes(node.id) ? 'expanded' : ''}`}
                  onClick={() => toggleNode(node.id)}
                >
                  <div className="node-header">
                    <h3 className="node-title">{node.title}</h3>
                    {node.children.length > 0 && (
                      <span className="toggle-button">
                        {expandedNodes.includes(node.id) ? '-' : '+'}
                      </span>
                    )}
                  </div>
                  
                  <p className="node-description">{node.description}</p>
                  
                  <div className="tech-tags">
                    {node.technologies.map(tech => (
                      <span key={tech.name} className="tech-tag">
                        <span className="tech-icon">{tech.icon}</span>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingLearningTree;