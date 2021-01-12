'use strict';

let money = +prompt('Ваш бюджет на месяц?',''),
    time = prompt("Введите дату в формате YYYY-MM-DD"),
    appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
    };

for( let i = 0; i < 2; i++) {
    let ans1 = prompt('Введите обязательную статью расходов в этом месяце',''),
        ans2 = +prompt('Во сколько обойдется?','');

    appData.expenses[ans1] = ans2;
}

alert('Ваш ежедневный бюджет: ' + (appData.budget / 30) + " руб.")