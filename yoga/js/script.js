window.addEventListener('DOMContentLoaded', function() {
   
    "use strict";

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a = 1) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent();

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(e) {
        let target = e.target;

        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    
    let deadline = '2022-02-05T14:27';

    function getTimeRemaining(endtime) {

        let t = Date.parse(endtime) - Date.now();

        if (t < 0) {
            return {
                'total': "00",
                'hours': "00",
                'minutes': "00",
                'seconds': "00",
            };
        }

        let seconds = Math.floor( (t / 1000) % 60 ),
            minutes = Math.floor( (t / 1000 / 60) % 60 ),
            hours = Math.floor( t / (1000 * 60 * 60) );

        if (seconds < 10) seconds = `0${seconds}`;
        if (minutes < 10) minutes = `0${minutes}`;
        if (hours < 10) hours = `0${hours}`;

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        tabBtn = document.querySelectorAll('.description-btn');

    function showModal(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    more.addEventListener('click', function() {
        showModal.call(this);
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        if(more.classList.contains('more-splash')) {
            more.classList.remove('more-splash');
        }
        
        tabBtn.forEach((item) => {
            if (item.classList.contains('more-splash')) {
                item.classList.remove('more-splash')
            }
        });

        document.body.style.overflow = '';
    });

    tabContent.forEach( item => {
        item.addEventListener('click', function(e){
            let target = e.target;

            if(target.matches('.description-btn')) {
                showModal.call(target);
            } 
        });
    });

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...',
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();

            let inputs = elem.getElementsByTagName('input');
            elem.appendChild(statusMessage);

            let formData = new FormData(elem),
                obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);


            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open("POST", '../server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });

                    request.send(data);
                });
            }
            
            function clearInput(){
                for (let input of inputs) {
                    input.value = '';
                }
            }

            postData(json).then( () => statusMessage.innerHTML = message.loading)
                            .then(() => statusMessage.innerHTML = message.success)
                            .catch(() => statusMessage.innerHTML = message.failure)
                            .then(clearInput());
        });
    }

    sendForm(form);
    sendForm(contactForm);

    // slider

    let slideIndex = 1, // тот слайд, который показывается в текущий момент
        slides = document.querySelectorAll('.slider-item'),
        prev =  document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none");

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //Сalc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        if(this.value != "") {
            personsSum += +this.value;
            total = (daysSum + personsSum) * 4000;
    
            if (restDays.value == '') {
                totalValue.innerHTML = "0";
            } else {
                totalValue.innerHTML = total;
            }
        } else {
            totalValue.innerHTML = 0;
        }
    });

    restDays.addEventListener('change', function() {
        if (this.value != "") {
            daysSum += +this.value;
            total = (daysSum + personsSum) * 4000;
    
            if (persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        } else {
            totalValue.innerHTML = 0;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});