'use strict';

let menuItem = document.createElement('li'),
    menu = document.querySelector('.menu'),
    items = document.querySelectorAll('.menu-item');

menuItem.classList.add('menu-item');
menuItem.textContent = 'Пятый пункт';

menu.appendChild(menuItem);

menu.replaceChild(items[1], items[2]);
menu.insertBefore(items[2], items[1]);

document.body.style.background = 'url(img/apple_true.jpg) center center/cover no-repeat';

document.getElementById('title').textContent = "Мы продаем только подлинную технику Apple";

document.querySelector('.adv').style.display = 'none';

document.getElementById('prompt').textContent = prompt("Ваше отношение к технике Apple?");

