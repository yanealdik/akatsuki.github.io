import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Шоколадное мороженое',
      price: 349,
      quantity: 1,
      image: '/api/placeholder/80/80',
      weight: '120г'
    },
    {
      id: 2,
      name: 'Клубника и пиво',
      price: 399,
      quantity: 2,
      image: '/api/placeholder/80/80',
      weight: '120г'
    }
  ]);
  
  const [step, setStep] = useState('cart'); // 'cart', 'delivery', 'payment', 'confirmation'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card'
  });

  // Calculate cart totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = 299;
  const total = subtotal + deliveryCost;

  const handleQuantityChange = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 'cart') setStep('delivery');
    else if (step === 'delivery') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  const handlePrevStep = () => {
    if (step === 'delivery') setStep('cart');
    else if (step === 'payment') setStep('delivery');
    else if (step === 'confirmation') setStep('payment');
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('cart-overlay')) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>
            {step === 'cart' && 'Корзина'}
            {step === 'delivery' && 'Доставка'}
            {step === 'payment' && 'Оплата'}
            {step === 'confirmation' && 'Подтверждение'}
          </h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="cart-progress">
          <div className={`progress-step ${step === 'cart' ? 'active' : ''} ${['delivery', 'payment', 'confirmation'].includes(step) ? 'completed' : ''}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step === 'delivery' ? 'active' : ''} ${['payment', 'confirmation'].includes(step) ? 'completed' : ''}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step === 'payment' ? 'active' : ''} ${['confirmation'].includes(step) ? 'completed' : ''}`}>3</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step === 'confirmation' ? 'active' : ''}`}>4</div>
        </div>

        {step === 'cart' && (
          <div className="cart-content">
            {items.length === 0 ? (
              <div className="empty-cart">
                <img src="/api/placeholder/120/120" alt="Пустая корзина" />
                <p>Ваша корзина пуста</p>
                <button className="shop-button" onClick={onClose}>Продолжить покупки</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-weight">{item.weight}</p>
                        <div className="item-price">{item.price} ₽</div>
                      </div>
                      <div className="item-actions">
                        <div className="quantity-control">
                          <button 
                            className="quantity-btn" 
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn" 
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn" 
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Товары ({itemCount})</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="summary-row">
                    <span>Доставка</span>
                    <span>{deliveryCost} ₽</span>
                  </div>
                  <div className="summary-total">
                    <span>Итого</span>
                    <span>{total} ₽</span>
                  </div>
                  <button className="checkout-button" onClick={handleNextStep}>
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 'delivery' && (
          <div className="delivery-form">
            <div className="form-group">
              <label htmlFor="name">Имя и фамилия</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="example@mail.ru"
                required
              />
            </div>
            
            <div className="delivery-options">
              <h4>Способ доставки</h4>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    value="courier" 
                    checked={formData.deliveryMethod === 'courier'} 
                    onChange={handleInputChange} 
                  />
                  <span className="radio-custom"></span>
                  <span>Курьером</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    value="pickup" 
                    checked={formData.deliveryMethod === 'pickup'} 
                    onChange={handleInputChange} 
                  />
                  <span className="radio-custom"></span>
                  <span>Самовывоз</span>
                </label>
              </div>
            </div>
            
            {formData.deliveryMethod === 'courier' && (
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <textarea 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Введите адрес доставки"
                  required
                ></textarea>
              </div>
            )}
            
            <div className="form-actions">
              <button className="back-button" onClick={handlePrevStep}>
                Назад
              </button>
              <button className="next-button" onClick={handleNextStep}>
                Продолжить
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="payment-form">
            <div className="payment-options">
              <h4>Способ оплаты</h4>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    checked={formData.paymentMethod === 'card'} 
                    onChange={handleInputChange} 
                  />
                  <span className="radio-custom"></span>
                  <span>Банковской картой</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cash" 
                    checked={formData.paymentMethod === 'cash'} 
                    onChange={handleInputChange} 
                  />
                  <span className="radio-custom"></span>
                  <span>Наличными курьеру</span>
                </label>
              </div>
            </div>
            
            <div className="order-summary">
              <h4>Ваш заказ</h4>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>
              <div className="summary-row">
                <span>Доставка</span>
                <span>{deliveryCost} ₽</span>
              </div>
              <div className="summary-total">
                <span>Итого к оплате</span>
                <span>{total} ₽</span>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="back-button" onClick={handlePrevStep}>
                Назад
              </button>
              <button className="next-button" onClick={handleNextStep}>
                Подтвердить заказ
              </button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="confirmation">
            <div className="confirmation-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#FF5B9B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="#FF5B9B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Спасибо за заказ!</h3>
            <p className="order-number">Номер заказа: #NTO{Math.floor(Math.random() * 10000)}</p>
            <p className="confirmation-message">
              Ваш заказ успешно оформлен. Вы получите уведомление на email: {formData.email}.
            </p>
            <div className="delivery-info">
              <h4>Информация о доставке</h4>
              <p>{formData.name}</p>
              <p>{formData.phone}</p>
              {formData.deliveryMethod === 'courier' && (
                <p>{formData.address}</p>
              )}
              {formData.deliveryMethod === 'pickup' && (
                <p>Самовывоз из магазина</p>
              )}
            </div>
            <button className="continue-shopping" onClick={onClose}>
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;