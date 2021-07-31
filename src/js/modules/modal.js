function modal() {
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
}

module.exports = modal;