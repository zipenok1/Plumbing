import React from 'react'
import '../styles/pagesUser/contacts.css'

function Contacts() {
  return (
    <div className='Contacts'>
        <div className="Contacts__content">
            <h2>Контакты</h2>
            <div className='Contacts__content-map'>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1334.797479053742!2d37.79398019567133!3d48.0022143679705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e090594d5e74a1%3A0x30be1d5e326f125a!2z0L_RgNC-0YHQvy4g0JPRgNC40L3QutC10LLQuNGH0LAsIDYsINCU0L7QvdC10YbQuiwg0JTQvtC90LXRhtC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KPQutGA0LDQuNC90LAsIDgzMDAw!5e0!3m2!1sru!2sru!4v1746642808469!5m2!1sru!2sru" 
            width="100%" 
            height="100%" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта">
            </iframe>
            </div>
            <div className="Contacts__content-connection">
                <div className="connection__info">
                    <h3>Свяжитесь с нами</h3>
                    <div className="connection__items">
                        <div className="connection__item">
                            <div className="connection__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div className="connection__text">
                                <h4>Телефон</h4>
                                <a href="tel:+78001234567">+7 949 338 04 51</a>
                                <p>Бесплатный звонок по России</p>
                            </div>
                        </div>
                        <div className="connection__item">
                            <div className="connection__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="connection__text">
                                <h4>Адрес</h4>
                                <p>Донецк, проспект Гринкевича, 6</p>
                                <a href="#" className="direction-link">Как добраться →</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="connection__additional">
                    <h3>Дополнительная информация</h3>
                    <div className="faq-section">
                        <h4>Частые вопросы:</h4>
                        <div className="faq-item">
                            <details>
                                <summary>Какой график работы?</summary>
                                <p>Мы работаем ежедневно с 9:00 до 20:00 без выходных.</p>
                            </details>
                        </div>
                        <div className="faq-item">
                            <details>
                                <summary>Есть ли доставка?</summary>
                                <p>Да, мы осуществляем доставку по всему городу и области.</p>
                            </details>
                        </div>
                        <div className="faq-item">
                            <details>
                                <summary>Какие способы оплаты принимаете?</summary>
                                <p>Наличные, банковские карты, безналичный расчет.</p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contacts