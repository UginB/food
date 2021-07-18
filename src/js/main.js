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
        if (num >= 0 && num <= 10) {
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
          close = document.querySelector('[data-close]'),
          body = document.querySelector('body');

    const closeModal = () => {
        modal.style.display = 'none';
        body.style.paddingRight = `0`;
        body.style.overflow = 'auto';
    };

    let bodyWidth = body.offsetWidth;

    btn.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            body.style.overflow = 'hidden';
            body.style.paddingRight = `${body.clientWidth - bodyWidth}px`
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target == close) {
            closeModal();
        }
    });
});