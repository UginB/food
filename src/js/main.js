document.addEventListener('DOMContentLoaded', () => {
    const calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
    
});
