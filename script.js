// Основной JavaScript для сайта KoopJob

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем обработку, если это не якорная ссылка
            if (href === '#') return;
            
            // Если ссылка ведет на другую страницу, не применяем плавную прокрутку
            if (href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация карточек при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.feature-card, .team-card, .about-card, .feature-detail-card').forEach(card => {
        observer.observe(card);
    });
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .team-card, .about-card, .feature-detail-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate-in, 
        .team-card.animate-in, 
        .about-card.animate-in,
        .feature-detail-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
        
        .feature-detail-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-detail-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-detail-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-detail-card:nth-child(4) { transition-delay: 0.4s; }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .timeline-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.3s; }
        .timeline-item:nth-child(3) { transition-delay: 0.5s; }
        .timeline-item:nth-child(4) { transition-delay: 0.7s; }
    `;
    document.head.appendChild(style);
    
    // Наблюдаем за элементами таймлайна
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Валидация
            if (!name || !email || !message) {
                showMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Пожалуйста, введите корректный email адрес', 'error');
                return;
            }
            
            // В реальном приложении здесь был бы AJAX запрос к серверу
            // Для демо просто показываем сообщение об успехе
            
            // Показываем индикатор загрузки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки на сервер
            setTimeout(() => {
                // Создаем сообщение об успехе
                showMessage(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`, 'success');
                
                // Восстанавливаем кнопку
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Очищаем форму
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Функция для показа сообщений
    function showMessage(text, type) {
        // Удаляем предыдущие сообщения
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Создаем новое сообщение
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const bgColor = type === 'success' ? '#d4edda' : '#f8d7da';
        const textColor = type === 'success' ? '#155724' : '#721c24';
        
        messageDiv.innerHTML = `
            <div style="background-color: ${bgColor}; color: ${textColor}; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
                <i class="fas ${icon}" style="margin-right: 10px;"></i>
                ${text}
            </div>
        `;
        
        // Вставляем сообщение после формы
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        }
        
        // Убираем сообщение через 5 секунд
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Функция проверки email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Динамическое обновление года в футере
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Добавляем год в футер, если его там нет
    if (!yearSpan) {
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom) {
            const currentYear = new Date().getFullYear();
            footerBottom.innerHTML = footerBottom.innerHTML.replace('2023', currentYear);
        }
    }
    
    // Анимация плавающих элементов
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Инициализация плавающих элементов
    animateFloatingElements();
    
    // Добавляем эффект параллакса для герой-секций
    function initParallax() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSections = document.querySelectorAll('.hero, .about-hero, .features-hero, .team-hero, .contact-hero');
            
            heroSections.forEach(section => {
                const rate = scrolled * 0.5;
                section.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }
    
    // Инициализация параллакса
    initParallax();
});