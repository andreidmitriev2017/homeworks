'use strict';

let btn = document.getElementById('start'),
    arr = document.getElementsByTagName('div'),
    inputs = document.getElementsByClassName('expenses-item'),
    tagBtns = document.getElementsByTagName('button'),
    chooseIncome = document.querySelector('.choose-income'),
    optItms = document.querySelectorAll('.optionalexpenses-item'),
    savings = document.querySelector('.savings'),
    sum = document.querySelector('#sum'),
    per = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'),
    values = [];

for(let key in arr) {
    if (arr[key].className !== undefined &&
        arr[key].className.includes('-value')) {
            
        values.push(arr[key]);
    }
}

let conf = tagBtns[1],
    calc = tagBtns[2];

let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while(Number.isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

start();

let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: true,

        chooseExpenses: function() {
            for( let i = 0; i < 2; i++) {
                let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                    b = +prompt('Во сколько обойдется?', '');
            
                if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
                    && a != '' && b != '' && a.length < 50) {    
                    console.log('done');
            
                    this.expenses[a] = b;
                } else {
                    i--;
                }    
            };
        },

        detectDayBudget: function() {
            this.moneyPerDay = (this.budget / 30).toFixed();
            alert('Ваш ежедневный бюджет: ' + this.moneyPerDay + " руб.");
        },

        detectLevel: function() {
            if (this.moneyPerDay < 100) {
                console.log('миниммальный уровень достатка');
            } else if (this.moneyPerDay > 100 && this.moneyPerDay < 2000) {
                console.log("Средний уровень достатка");
            } else if (this.moneyPerDay > 2000) {
                console.log("Высокий уровень достатка");
            } else {
                console.log('Ошибка!');
            }
        },

        checkSavings: function() {
            if (this.savings == true) {
                let save = +prompt("Какова сумма накоплений?"),
                    percent = +prompt("Под какой процент?");
        
                this.monthIncome = save / 100 / 12 * percent;
                alert('Доход в месяц с Вашего дtпозита: ' + this.monthIncome);
            }
        },

        chooseOptExpenses: function() {
            let ans = confirm("Добавим необязательные статьи расходов?");
            
            if (ans) {
                for(let i = 0; i < 3; i++) {
                    this.optionalExpenses[i] = prompt("Статья необязательных расходов?"); 
                }
            }
        },

        chooseIncome: function() {
            let items = '',
                optAns;

            function checkIncome(inc) {
                if(!isNaN(+inc) || inc == '' || inc == null) {
                    return false;
                }
                
                return true;
            }
            
            while( !checkIncome(items) ) { 
                items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)','');
            }

            this.income = items.split(', ');

            optAns = prompt("Можето ещё?");

            if ( checkIncome(optAns) ) {
                let optMas = optAns.split(', ')

                for(let i = 0; i < optMas.length; i++) {
                    this.income.push(optMas[i]);
                }
            }

            this.income.sort();
            
            alert('Способы дополнительного заработка: ');
            this.income.forEach((item, i) => alert(`${i+1}: ${item}`));
        }
};


appData.chooseExpenses();
appData.detectDayBudget()
appData.detectLevel();
appData.checkSavings();
appData.chooseOptExpenses();
appData.chooseIncome();

console.log(`Программа содержит следующие данные`)
for (let key in appData) {
    console.log(`${key}: ${appData[key]}`);
}

