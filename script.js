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
    document.querySelectorAll('.feature-card, .team-card, .about-card').forEach(card => {
        observer.observe(card);
    });
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .team-card, .about-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate-in, 
        .team-card.animate-in, 
        .about-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    
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
            
            // В реальном приложении здесь был бы AJAX запрос к серверу
            // Для демо просто показываем сообщение об успехе
            
            // Создаем сообщение об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
                    <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
                    Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                </div>
            `;
            
            // Вставляем сообщение после формы
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            // Очищаем форму
            contactForm.reset();
            
            // Убираем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Динамическое обновление года в футере
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.text