function tabs() {
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
}

module.exports = tabs;