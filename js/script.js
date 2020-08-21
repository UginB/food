import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import forms from './modules/forms';
import cards from './modules/cards';
import calculating from './modules/calculating';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-10-10');
    modal('[data-modal]','.modal',modalTimerId);
    forms('form', modalTimerId);
    cards();
    calculating();
    slider({
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
});