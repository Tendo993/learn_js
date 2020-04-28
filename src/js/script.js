"use strict";

let money;
let start = function () {
    do {
        money = prompt("Ваш месячный доход?", 50000);
        console.log("money: ", money);
    } while (isNaN(money) || money == "" || money == null);
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: +1000000,
    period: +12,
    budget: money,
    budgetDay: +0,
    budgetMonth: +0,
    expensesMonth: +0,
    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы за расчитываемый период через запятую", "Чай, Кофе, Жвачка");
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 4; i++) {
            let q1, q2;
            if (i === 0) {
                q1 = prompt("Какие обязательные расходы у вас есть?", "Кварплата");
            } else if (i === 1) {
                q1 = prompt("Какие обязательные расходы у вас есть?", "Продукты");
            } else if (i === 2) {
                q1 = prompt("Какие обязательные расходы у вас есть?", "Бензин");
            } else if (i === 3) {
                q1 = prompt("Какие обязательные расходы у вас есть?", "Коммуналка");
            }

            do {
                if (i === 0) {
                    q2 = +prompt("Во сколько это обойдется?", "6000");
                } else if (i === 1) {
                    q2 = +prompt("Во сколько это обойдется?", "10000");
                } else if (i === 2) {
                    q2 = +prompt("Во сколько это обойдется?", "4000");
                } else if (i === 3) {
                    q2 = +prompt("Во сколько это обойдется?", "1000");
                }
            } while (isNaN(q2) || q2 == "" || q2 == null);
            appData.expenses[q1] = q2;
            console.log('appData.expenses: ', appData.expenses);
        }
    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getTargetMonth: function () {
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    },

    getBudget: function () {
        appData.budgetMonth = +(appData.budget - appData.expensesMonth);
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getStatusIncome: function () {
        if (appData.budgetDay <= 0) {
            return "Что-то пошло не так";
        } else if (appData.budgetDay < 300) {
            return "Низкий уровень дохода";
        } else if (appData.budgetDay <= 800) {
            return "Средний уровень дохода";
        } else {
            return "Высокий уровень дохода";
        }
    },

    showAppData: function () {
        for (let key in appData) {
            console.log('Данные: ' + key + ' Значение: ' + appData[key]);
        }
    },

    checkGoal: function () {
        if (appData.budgetMonth < 0) {
            console.log('Цель не будет достигнута.');
        } else {
            console.log('Период:', appData.period);
        }
    },

    accumulatedPeriod: function () {
        console.log('Накопления за период:', appData.budgetMonth * appData.period);
    },

    init: function () {
        appData.asking();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();
        appData.showAppData();
        appData.getStatusIncome();
        appData.checkGoal();
        appData.accumulatedPeriod();
    }
};

appData.init();