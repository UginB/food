import calc from'./modules/calc';
import cards from'./modules/cards';
import forms from'./modules/forms';
import modal from'./modules/modal';
import slider from'./modules/slider';
import tabs from'./modules/tabs';
import timer from'./modules/timer';
import {openModal} from './modules/modal';



document.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 50000);

    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimer);
    timer('.timer', '2021-8-11');
    cards();
    calc();
    forms('form', modalTimer);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        slides: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    
});
