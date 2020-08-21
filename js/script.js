window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          modal = require('./modules/modal'),
          forms = require('./modules/forms'),
          cards = require('./modules/cards'),
          calculating = require('./modules/calculating'),
          slider = require('./modules/slider');

    tabs();
    timer();
    modal();
    forms();
    cards();
    calculating();
    slider();
});