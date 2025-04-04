import React from 'react';
import "./Footer.css";
import Logo from "../../assets/images/akat.png";
import Inst from "../../assets/images/Instagram.svg";
import Tik from "../../assets/images/Tiktok.svg";
import Tg from "../../assets/images/Telegram.svg";

const cities = [
    "Костанай", "Лондон","Павлодар", "Коста-Рика", "Париж", "Берлин", "Мадрид", "Рим", "Амстердам", "Стокгольм", "Вена", 
    "Прага", "Будапешт", "Варшава", "Афины", "Хельсинки", "Копенгаген", "Брюссель", 
    "Дублин", "Лиссабон", "Бухарест", "Белград", "София", "Вильнюс", "Рига", "Таллин", 
    "Бишкек", "Астана", "Тбилиси", "Душанбе", "Пекин", "Токио", "Сеул", "Шанхай", 
    "Гонконг", "Сингапур", "Дубай", "Бангкок", "Нью-Дели", "Тегеран", "Стамбул", "Анкара",
    "Санкт-Петербург", "Казань", "Новосибирск", "Екатеринбург", "Ростов-на-Дону", 
    "Самара", "Нижний Новгород", "Челябинск", "Омск", "Волгоград", "Алматы", "Минск", 
    "Баку", "Ереван", "Ташкент", "Ашхабад", "Коломбо", "Хошимин", "Тайбэй", "Макка"
];

const Footer = () => {
  return (
    <div>
      <main className="main-content"></main>
      
      <section className="global-users">
        <h2>Пользователи со всего мира !</h2>
        <p>ВМЕСТЕ C <span className="red">AKATSUKI </span>COURSES</p>
        <div className="cities-slider-wrapper">
          <div className="cities-slider">
            {[...cities, ...cities].map((city, index) => (
              <span key={index}>{city}  • </span>
            ))}
          </div>
        </div>

        <div className="cities-slider-wrapper">
          <div className="cities-sliderr">
            {[...cities, ...cities].map((city, index) => (
              <span key={index}>{city} • </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        

        <div className="footer-form">
          <h2>Остались вопросы?</h2>
          <p>
            Если вы хотите больше узнать о <span>Akatsuki</span> Courses или не
            знаете, какую программу выбрать, оставляйте заявку
          </p>
          <input type="text" placeholder="Имя" />
          <div className="input-group">
            <select>
              <option value="kz">🇰🇿 +7</option>
            </select>
            <input type="text" placeholder="Телефон" />
            <input type="email" placeholder="Электронная почта" />
          </div>
          <button>Отправить</button>
        </div>

        <div className="footer-top">
          <div className="footer-logo">
            <img src={Logo} alt="Akatsuki Courses" />
            <p>Akatsuki Courses</p>
          </div>
          <div className="footer-contacts">
            <p>📞 8 777 953 85 25</p>
            <p> info@akatsukicourses.kz</p>
          </div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/yanealdik/"><img src={Inst} alt="Instagram" /></a>
            <a href="#"><img src={Tik} alt="Tiktok" /></a>
            <a href="#"><img src={Tg} alt="Telegram" /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Akatsuki Courses. Все права защищены.</p>
        </div>
      </footer>

    </div>
  );
};

export default Footer;
