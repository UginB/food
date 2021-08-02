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

    tabs();
    modal('[data-modal]', '.modal', modalTimer);
    timer();
    cards();
    calc();
    forms('form', modalTimer);
    slider();
    
});
