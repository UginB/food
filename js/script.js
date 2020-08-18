window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show' ,'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadLine = '2020-09-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t/(1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)  % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
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
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
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

    setClock('.timer', deadLine);

    // Modal

    
    const modalBtns = document.querySelectorAll('[data-modal]'), 
          modal = document.querySelector('.modal');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') =='') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        } 
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //cards
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
            <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url, data)=> {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }; 

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container"
    // ).render();

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data)=> {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }; 

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            // const formData = new FormData(form);
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // const json = JSON.stringify(object);
            // request.send(json);
            
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 2000);
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>          
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.add('hide');
            closeModal();
        }, 4000);
    }

    
    // slider

    const slides = document.querySelectorAll('.offer__slide'),
    nextBtn = document.querySelector('.offer__slider-next'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    currentIndex = document.querySelector('#current'),
    totalIndex = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

    let currentSlide = 1;
    let offset = 0;

    if(slides.length < 10) {
    totalIndex.textContent = `0${slides.length}`;  
    currentIndex.textContent = `0${currentSlide}`; 
    } else {
    totalIndex.textContent = slides.length;
    currentIndex.textContent = currentSlide; 
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
    slide.style.width = width;
    });

    nextBtn.addEventListener('click',()=>{
        if(offset == +width.slice(0,width.length-2) * (slides.length - 1)){
        offset = 0;
        } else {
        offset += +width.slice(0,width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(currentSlide == slides.length) {
        currentSlide = 1;
        } else {
        currentSlide++;
        }

        if(slides.length < 10) {  
        currentIndex.textContent = `0${currentSlide}`; 
        } else {
        currentIndex.textContent = currentSlide; 
        }

        dots.forEach(dot=> dot.style.opacity = '.5');
        dots[currentSlide-1].style.opacity = '1';
    });

    prevBtn.addEventListener('click',()=>{
        if(offset == 0){
        offset = +width.slice(0,width.length-2) * (slides.length - 1);
        } else {
        offset -= +width.slice(0,width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(currentSlide == 1) {
        currentSlide = slides.length;
        } else {
        currentSlide--;
        }

        if(slides.length < 10) {  
        currentIndex.textContent = `0${currentSlide}`; 
        } else {
        currentIndex.textContent = currentSlide; 
        }

        dots.forEach(dot=> dot.style.opacity = '.5');
        dots[currentSlide-1].style.opacity = '1';
    });

    //SLIDER ver 1.0


    // function hideSlides() {
    //     slides.forEach((item)=>{
    //         item.classList.add('hide');
    //     });
    // }

    // function showSlide(currentSlide = 1) {
    //     slides.forEach((item, i)=>{
    //         if(currentSlide == i+1) {
    //             item.classList.remove('hide');
    //             item.classList.add('show');
    //         }
    //     });
    // }

    // function refreshIndex() {
    //     if(currentSlide < 10) {
    //         currentIndex.textContent = `0${currentSlide}`;  
    //     } else {
    //         currentIndex.textContent = currentSlide;
    //     } 

    //     if(slides.length < 10) {
    //         totalIndex.textContent = `0${slides.length}`;  
    //     } else {
    //         totalIndex.textContent = slides.length;
    //     }
    // }
        
    // refreshIndex();
    // hideSlides();
    // showSlide(currentSlide);

    // nextBtn.addEventListener('click',()=>{
    //     currentSlide += 1;
    //     if(currentSlide == slides.length+1) {
    //         currentSlide = 1;
    //     }
    //     hideSlides();
    //     showSlide(currentSlide);
    //     refreshIndex();
    // });

    // prevBtn.addEventListener('click',()=>{
    //     currentSlide -= 1;
    //     if(currentSlide == 0) {
    //         currentSlide = slides.length;
    //     }
    //     hideSlides();
    //     showSlide(currentSlide);
    //     refreshIndex();
    // });



    //dots

    const carousel = document.querySelector('.offer__slider-wrapper');
    const indicators = document.createElement('div');

    carousel.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    carousel.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        indicators.append(dot); 
        if(i == 0){
            dot.style.opacity = '1';
        }
    }

    let dots = document.querySelectorAll('.dot');
    carousel.addEventListener('click',(event)=>{
        dots.forEach((dot, i)=>{
            dot.style.opacity = '.5';
            if(event.target == dot) {
                offset = +width.slice(0,width.length-2) * i;
                dot.style.opacity = '1'; 
                currentSlide = ++i;
            }
        });
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10) {  
            currentIndex.textContent = `0${currentSlide}`; 
        } else {
            currentIndex.textContent = currentSlide; 
        }
    });
});






















