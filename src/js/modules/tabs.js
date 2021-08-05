function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, activeClass) {
    //tabs
    const tabsParent = document.querySelector(tabsParentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);
          

    const hideTabsContent = () => {
        tabsContent.forEach(item => item.style.display = 'none');
        tabs.forEach(tab => tab.classList.remove(activeClass));
    };

    const showTabContent = (i = 0) => {
        tabs[i].classList.add(activeClass);
        tabsContent[i].style.display = 'block';
    };

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;