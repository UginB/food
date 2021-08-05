function slider({container, slidesSelector, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        //slider

        const slides = document.querySelectorAll(slidesSelector),
        currentNum = document.querySelector(currentCounter),
        totalNum = document.querySelector(totalCounter),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        sliderSection = document.querySelector(container),
        dotsWrapper = document.createElement('div');
    let index = 0,
    transformCount = 0;

    function refreshNumber() {

    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length-1;
    }

    (slides.length < 10) ? totalNum.innerHTML = `0${slides.length}`: totalNum.innerHTML = slides.length;
    (index < 10) ? currentNum.innerHTML = `0${index+1}` : currentNum.innerHTML = index;
        if (index == slides.length) {
            currentNum.innerHTML = `0${index}`;
        }
    }

    refreshNumber();

    function refreshDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            (i == index) ? dot.style.opacity = '1' : dot.style.opacity = '.5';
        });
    }

    // function refreshSlide() {
    //     slides.forEach((slide, i) => {
    //         (i == index) ? slide.style.display = 'block' : slide.style.display = 'none';
    //     });
    // }

    // refreshSlide();

    // nextBtn.addEventListener('click', () => {
    //     index++;
    //     refreshSlide();
    //     refreshNumber();
    // });

    // prevBtn.addEventListener('click', () => {
    //     index--;
    //     refreshSlide();
    //     refreshNumber();
    // });

    document.querySelector(wrapper).style.overflow = 'hidden';
    const sliderInner = document.querySelector(field);

    sliderInner.style.cssText = `
    display: flex;
    width: ${slides.length*100}%;
    transition: .5s all;
    `;

    nextBtn.addEventListener('click', () => {
        index++;
        if (index >= slides.length) {
            transformCount = 0;
            sliderInner.style.transform = `translateX(${transformCount}%)`;
        } else {
            transformCount-=25;
            sliderInner.style.transform = `translateX(${transformCount}%)`}
        refreshNumber();
        refreshDots();
    });

    prevBtn.addEventListener('click', () => {
        index--;
        if (index < 0) {
            transformCount = -75;
            sliderInner.style.transform = `translateX(${transformCount}%)`;
        } else {
            transformCount+=25;
            sliderInner.style.transform = `translateX(${transformCount}%`}
        refreshNumber();
        refreshDots();
    });

    //dots

    dotsWrapper.classList.add('carousel-indicators');
    sliderSection.style.position = 'relative';
    sliderSection.append(dotsWrapper);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsWrapper.append(dot);
        (i == 0) ? dot.style.opacity = '1' : dot.style.opacity = '.5';
    }

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            transformCount = -25;
            sliderInner.style.transform = `translateX(${transformCount * i}%`;
            index = i;
            refreshDots();
            refreshNumber();
        });
    });
}

export default slider;