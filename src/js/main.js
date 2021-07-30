document.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');
          

    const hideTabsContent = () => {
        tabsContent.forEach(item => item.style.display = 'none');
        tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
    };

    const showTabContent = (i = 0) => {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].style.display = 'block';
    };

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });


    //timer

    const deadline = '2021-8-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //дает количество миллисекунд
              days =  Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //modal

    const modal = document.querySelector('.modal'),
          btn = document.querySelectorAll('[data-modal]'),
          body = document.querySelector('body'),
          bodyWidth = body.offsetWidth;

    function closeModal() {
        modal.style.display = 'none';
        body.style.paddingRight = `0`;
        body.style.overflow = 'auto';
    }

    function openModal() {
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
        body.style.paddingRight = `${body.clientWidth - bodyWidth}px`;
        // clearInterval(modalTimer);
    }

    // const modalTimer = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
 
    window.addEventListener('scroll', showModalByScroll);

    

    btn.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.classList.contains('modal__close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    });

    // cards

    const menu = document.querySelector('.menu__field').firstElementChild;

    class Card {
        constructor(parentSelector, src, alt, subtitle, descr, price, ...classes) {
            this.parent = document.querySelector(parentSelector);
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML+=`
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new Card('.menu .container', "img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229).render();

    new Card('.menu .container', "img/tabs/elite.jpg", "elite",'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550).render();

    new Card('.menu .container', "img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430).render();


    //forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => postData(item));

    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('img');
    //         statusMessage.src = message.loading;
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;
    //         form.isertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');

    //         request.setRequestHeader('Content-type', 'application/json'); //обязательно только для JSON
    //         const formData = new FormData(form);

    //         const object = {};                                 //только для JSON
    //         formData.forEach((value, key) => {                 //только для JSON  
    //             object[key] = value;                           //только для JSON
    //         });

    //         const json = JSON.stringify(object);               //только для JSON

    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if(request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal(message.success);
    //                 form.reset();
    //                 statusMessage.remove();
    //             } else {
    //                 showThanksModal(message.failure);
    //             }
    //         });
    //     });
    // }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};                                 //только для JSON
            formData.forEach((value, key) => {                 //только для JSON  
                object[key] = value;                           //только для JSON
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'  //только для JSON
                },
                body: JSON.stringify(object) // или formData
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        openModal();
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeModal();
        }, 4000 );
    }


    //slider

    const slides = document.querySelectorAll('.offer__slide'),
          currentNum = document.querySelector('#current'),
          totalNum = document.querySelector('#total'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          sliderSection = document.querySelector('.offer__slider'),
          dotsWrapper = document.createElement('div');
    let index = 0,
        transformCount = 0;

    function refreshNumber() {

        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length-1;
        }

        (slides.length < 10) ? totalNum.innerHTML = `0${slides.length}`: totalNum.innerHTML = slides.length;
        (index < 10) ? currentNum.innerHTML = `0${index+1}` : currentNum.innerHTML = index;
        if (index == slides.length) {
            currentNum.innerHTML = `0${index}`
        }
    }

    refreshNumber();

    function refreshDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            (i == index) ? dot.style.opacity = '1' : dot.style.opacity = '.5';
        });
    }

    // function refreshSlide() {
    //     slides.forEach((slide, i) => {
    //         (i == index) ? slide.style.display = 'block' : slide.style.display = 'none';
    //     });
    // }

    // refreshSlide();

    // nextBtn.addEventListener('click', () => {
    //     index++;
    //     refreshSlide();
    //     refreshNumber();
    // });

    // prevBtn.addEventListener('click', () => {
    //     index--;
    //     refreshSlide();
    //     refreshNumber();
    // });

    document.querySelector('.offer__slider-wrapper').style.overflow = 'hidden';
    const sliderInner = document.querySelector('.offer__slider-inner');

    sliderInner.style.cssText = `
        display: flex;
        width: ${slides.length*100}%;
        transition: .5s all;
    `;

    nextBtn.addEventListener('click', () => {
        index++;
        if (index >= slides.length) {
            transformCount = 0;
            sliderInner.style.transform = `translateX(${transformCount}%)`;
        } else {
            transformCount-=25;
            sliderInner.style.transform = `translateX(${transformCount}%)`}
        refreshNumber();
        refreshDots();
    });

    prevBtn.addEventListener('click', () => {
        index--;
        if (index < 0) {
            transformCount = -75;
            sliderInner.style.transform = `translateX(${transformCount}%)`;
        } else {
            transformCount+=25;
            sliderInner.style.transform = `translateX(${transformCount}%`}
        refreshNumber();
        refreshDots();
    });

    //dots

    dotsWrapper.classList.add('carousel-indicators');
    sliderSection.style.position = 'relative';
    sliderSection.append(dotsWrapper);
    
    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsWrapper.append(dot);
        (i == 0) ? dot.style.opacity = '1' : dot.style.opacity = '.5';
    }

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            transformCount = -25;
            sliderInner.style.transform = `translateX(${transformCount * i}%`
            index = i;
            refreshDots();
            refreshNumber();
        });
    });

    //calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375')
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInform(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {  
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
                calcTotal();
            });
        })
    }

    getStaticInform('#gender div', 'calculating__choose-item_active');
    getStaticInform('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInform(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;    
            }
            calcTotal();
        });
    }

    getDynamicInform('#height');
    getDynamicInform('#weight');
    getDynamicInform('#age');
});
