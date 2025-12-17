// Функции для сокращения кода
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Бургер меню
const burger = $('.burger');
const nav = $('.nav');
if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    $$('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Плавная прокрутка для якорных ссылок
$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Анимация появления элементов при скролле
const reveals = $$('.reveal');
function revealBlocks() {
    reveals.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 100) el.classList.add('active');
    });
}
window.addEventListener('scroll', revealBlocks);
window.addEventListener('load', revealBlocks);

// Кнопка "Наверх"
const upBtn = $('#upBtn');
window.addEventListener('scroll', () => {
    if (!upBtn) return;
    upBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
if (upBtn) upBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Валидация формы
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Пожалуйста, заполните все обязательные поля');
            e.preventDefault();
        } else {
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            form.reset();
            e.preventDefault();
        }
    });
}

// Раскрытие карточек товаров
const cardsWrap = document.querySelector('.cards');
if (cardsWrap) {
    cardsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.card-btn');
        if (!btn) return;
        e.preventDefault();
        const card = btn.closest('.card');
        if (!card) return;

        // Раскрываем выбранную карточку
        cardsWrap.classList.add('hide-others');
        card.classList.add('expanded');

        // Добавляем обработчик для кнопки "Назад"
        const closeBtn = card.querySelector('.close-details');
        if (closeBtn) {
            const handler = () => {
                card.classList.remove('expanded');
                cardsWrap.classList.remove('hide-others');
                closeBtn.removeEventListener('click', handler);
            };
            closeBtn.addEventListener('click', handler);
        }

        // Плавная прокрутка к раскрытой карточке
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    });
}

// СЛАЙДЕР С ФАКТАМИ - простой переключатель
const factSlides = $$('.fact-slide');
const factsPrevBtn = $('.facts-prev-button');
const factsNextBtn = $('.facts-next-button');
const indicators = $$('.slide-indicator');

let currentSlideIndex = 0;
const totalSlides = factSlides.length;

// Функция для показа слайда
function showSlide(index) {
    // Скрываем все слайды
    factSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Убираем активный класс у всех индикаторов
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Показываем нужный слайд
    factSlides[index].classList.add('active');
    
    // Активируем нужный индикатор
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// Функция для следующего слайда
function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= totalSlides) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

// Функция для предыдущего слайда
function prevSlide() {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) {
        prevIndex = totalSlides - 1;
    }
    showSlide(prevIndex);
}

// Обработчики для кнопок
if (factsPrevBtn && factsNextBtn) {
    factsPrevBtn.addEventListener('click', prevSlide);
    factsNextBtn.addEventListener('click', nextSlide);
}

// Обработчики для индикаторов
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Автопрокрутка слайдов
let slideInterval = setInterval(nextSlide, 5000);

// Останавливаем автопрокрутку при наведении на слайдер
const factsSliderContainer = $('.facts-slider-container');
if (factsSliderContainer) {
    factsSliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    factsSliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Инициализация первого слайда
showSlide(0);