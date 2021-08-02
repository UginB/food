function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector),
          body = document.querySelector('body');
    modal.style.display = 'none';
    body.style.paddingRight = `0`;
    body.style.overflow = 'auto';
}

function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector),
          body = document.querySelector('body'),
          bodyWidth = body.offsetWidth;
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${body.clientWidth - bodyWidth}px`;
    if (modalTimer) {
        clearInterval(modalTimer);
    }
}

function modal(triggerSelector, modalSelector, modalTimer) {
    //modal

    const modal = document.querySelector(modalSelector),
          btn = document.querySelectorAll(triggerSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    btn.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modalSelector, modalTimer);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.style.display == 'block') {
            closeModal(modalSelector);
        }
    });
}

export default modal;
export {openModal, closeModal}