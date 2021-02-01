'use strict';

let btn = document.getElementById('start'),
    arr = document.getElementsByTagName('div'),
    inputs = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    chooseIncome = document.querySelector('.choose-income'),
    optItms = document.querySelectorAll('.optionalexpenses-item'),
    savings = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    per = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

let money, time;

btn.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt('Ваш бюджет на месяц?', '');
    
    while(Number.isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();

    expensesBtn.removeAttribute('disabled');
    optionalExpensesBtn.removeAttribute('disabled');
    countBtn.removeAttribute('disabled');
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for( let i = 0; i < inputs.length; i++) {
        let a = inputs[i].value,
            b = inputs[++i].value;
    
        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
            && a != '' && b != '' && a.length < 50) {    
            console.log('done');
    
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }    
    };

    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for(let i = 0; i < optItms.length; i++) {
        appData.optionalExpenses[i] = optItms[i].value; 
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBtn.addEventListener('click', function() {
    if(appData.budget != undefined) {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.moneyPerDay = ((appData.budget - sum)/ 30).toFixed();
        dayBudgetValue.textContent =  appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Миниммальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = 'Ошибка!';
        }
    } else {
        dayBudgetValue.textContent = "Ошибка!";
    }
});

chooseIncome.addEventListener('input', function() {
    appData.income = chooseIncome.value.split(', ');
    incomeValue.textContent = appData.income.join(', ');
});

savings.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sum.addEventListener('input', function() {
    if (appData.savings == true) {
        let summ = +sum.value;
        let percent = +per.value;
        appData.monthIncome = summ/ 100 / 12 * percent;
        appData.yearIncome = summ/ 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

per.addEventListener('input', function() {
    if (appData.savings == true) {
        let summ = +sum.value;
        let percent = +per.value;
        appData.monthIncome = summ/ 100 / 12 * percent;
        appData.yearIncome = summ/ 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
};

/* console.log(`Программа содержит следующие данные`)
for (let key in appData) {
    console.log(`${key}: ${appData[key]}`);
}
 */
