function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
    nextBtn = document.querySelector('.offer__slider-next'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    currentIndex = document.querySelector('#current'),
    totalIndex = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

    let currentSlide = 1;
    let offset = 0;

    if(slides.length < 10) {
    totalIndex.textContent = `0${slides.length}`;  
    currentIndex.textContent = `0${currentSlide}`; 
    } else {
    totalIndex.textContent = slides.length;
    currentIndex.textContent = currentSlide; 
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
    slide.style.width = width;
    });

    nextBtn.addEventListener('click',()=>{
        if(offset == +width.replace(/\D/g,'') * (slides.length - 1)){
        offset = 0;
        } else {
        offset += +width.slice(0,width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(currentSlide == slides.length) {
        currentSlide = 1;
        } else {
        currentSlide++;
        }

        if(slides.length < 10) {  
        currentIndex.textContent = `0${currentSlide}`; 
        } else {
        currentIndex.textContent = currentSlide; 
        }

        dots.forEach(dot=> dot.style.opacity = '.5');
        dots[currentSlide-1].style.opacity = '1';
    });

    prevBtn.addEventListener('click',()=>{
        if(offset == 0){
        offset = +width.slice(0,width.length-2) * (slides.length - 1);
        } else {
        offset -= +width.slice(0,width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(currentSlide == 1) {
        currentSlide = slides.length;
        } else {
        currentSlide--;
        }

        if(slides.length < 10) {  
        currentIndex.textContent = `0${currentSlide}`; 
        } else {
        currentIndex.textContent = currentSlide; 
        }

        dots.forEach(dot=> dot.style.opacity = '.5');
        dots[currentSlide-1].style.opacity = '1';
    });

    //SLIDER ver 1.0


    // function hideSlides() {
    //     slides.forEach((item)=>{
    //         item.classList.add('hide');
    //     });
    // }

    // function showSlide(currentSlide = 1) {
    //     slides.forEach((item, i)=>{
    //         if(currentSlide == i+1) {
    //             item.classList.remove('hide');
    //             item.classList.add('show');
    //         }
    //     });
    // }

    // function refreshIndex() {
    //     if(currentSlide < 10) {
    //         currentIndex.textContent = `0${currentSlide}`;  
    //     } else {
    //         currentIndex.textContent = currentSlide;
    //     } 

    //     if(slides.length < 10) {
    //         totalIndex.textContent = `0${slides.length}`;  
    //     } else {
    //         totalIndex.textContent = slides.length;
    //     }
    // }
        
    // refreshIndex();
    // hideSlides();
    // showSlide(currentSlide);

    // nextBtn.addEventListener('click',()=>{
    //     currentSlide += 1;
    //     if(currentSlide == slides.length+1) {
    //         currentSlide = 1;
    //     }
    //     hideSlides();
    //     showSlide(currentSlide);
    //     refreshIndex();
    // });

    // prevBtn.addEventListener('click',()=>{
    //     currentSlide -= 1;
    //     if(currentSlide == 0) {
    //         currentSlide = slides.length;
    //     }
    //     hideSlides();
    //     showSlide(currentSlide);
    //     refreshIndex();
    // });



    //dots

    const carousel = document.querySelector('.offer__slider-wrapper');
    const indicators = document.createElement('div');

    carousel.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    carousel.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        indicators.append(dot); 
        if(i == 0){
            dot.style.opacity = '1';
        }
    }

    let dots = document.querySelectorAll('.dot');
    carousel.addEventListener('click',(event)=>{
        dots.forEach((dot, i)=>{
            dot.style.opacity = '.5';
            if(event.target == dot) {
                offset = +width.slice(0,width.length-2) * i;
                dot.style.opacity = '1'; 
                currentSlide = ++i;
            }
        });
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10) {  
            currentIndex.textContent = `0${currentSlide}`; 
        } else {
            currentIndex.textContent = currentSlide; 
        }
    });
}

module.exports = slider;