'use strict';


let startButton = document.querySelector('#start'), // Кнопка запуска
    cancelButton = document.querySelector('#cancel'), // Кнопка сброса
    incomePlusButton = document.querySelector('.income > button'), // Кнопка доходы
    expensesPlusButton = document.querySelector('.expenses > button'), // Кнопка расходы
    depositCheckbox = document.querySelectorAll('#deposit-check'), // Чекбокс депозит
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), // Поля возможные доходы
    result = document.querySelector('.result'), // Блок с результатами
    resultValue = result.querySelectorAll('.result-total'), // Все поля с значениями результатов
    salaryAmount = document.querySelector('.salary-amount'), // Поле месячный доход
    expensesItems = document.querySelectorAll('.expenses-items'), // Поля обязательные расходы
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Поле возможные расходы
    targetAmount = document.querySelector('.target-amount'), // Поле цель
    periodSelect = document.querySelector('.period-select'), // Слайдер период
    budgetMonthValue = document.querySelector('.budget_month-value'), // Поле Доход за месяц
    budgetDayValue = document.querySelector('.budget_day-value'), // Поле Дневной бюджет
    expensesMonthValue = document.querySelector('.expenses_month-value'), // Поле Расходы за месяц
    additionalIncomeValue = document.querySelector('.additional_income-value'), // Поле возможные доходы
    additionalExpensesValue = document.querySelector('.additional_expenses-value'), // Поле возможные расходы
    accumulatedMonthValue = document.querySelector('.income_period-value'), // Поле Накопления за месяц
    targetMonthValue = document.querySelector('.target_month-value'), // Поле срок достижения цели
    incomePeriodValue = document.querySelector('.income_period-value'), // Поле Накопления за период
    incomeItems = document.querySelectorAll('.income-items'), // Поле дополнительный доход
    periodAmount = document.querySelector('.period-amount'), // Значение поля период расчета
    allInputs = document.querySelectorAll('input'); // Все инпуты

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: +0,
    moneyDeposit: +0,
    budget: 0,
    budgetDay: +0,
    budgetMonth: +0,
    expensesMonth: +0,
    start: function () {
        if (salaryAmount.value !== '') {
            this.budget = +salaryAmount.value;
            console.log(this.budget);
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getIncomeMonth();
            this.getBudget();
            this.getAddExpenses();
            this.getAddIncome();
            this.showResult();
            this.blockAllInputs();
        }
    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    },

    //Добавить поля Обязательные расходы
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '',
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlusButton.style.display = 'none';
        };
    },

    // Добавить поля Дополнительный доход
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlusButton);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlusButton.style.display = 'none';
        }
    },

    // Записать значения полей Обязательные расходы
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            };
        });
    },

    // Запись в поле Возможные расходы
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            };
        });
    },
    // Запись в поле возможные доходы
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            };
        });
    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getIncomeMonth: function () {
        for (let key in appData.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },

    getBudget: function () {
        this.budgetMonth = +(this.budget + this.incomeMonth - this.expensesMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },

    getPeriodSelect: function () {
        let period = +periodSelect.value;
        switch (period) {
            case 1:
                periodAmount.textContent = '1';
                break;
            case 2:
                periodAmount.textContent = '2';
                break;
            case 3:
                periodAmount.textContent = '3';
                break;
            case 4:
                periodAmount.textContent = '4';
                break;
            case 5:
                periodAmount.textContent = '5';
                break;
            case 6:
                periodAmount.textContent = '6';
                break;
            case 7:
                periodAmount.textContent = '7';
                break;
            case 8:
                periodAmount.textContent = '8';
                break;
            case 9:
                periodAmount.textContent = '9';
                break;
            case 10:
                periodAmount.textContent = '10';
                break;
            case 11:
                periodAmount.textContent = '11';
                break;
            case 12:
                periodAmount.textContent = '12';
                break;
        };
        incomePeriodValue.value = this.calcPeriod();
        this.showResult();
    },

    // Блокировать все инпуты
    blockAllInputs: function () {
        allInputs.forEach(function (item) {
            if (item.type == "text") {
                item.disabled = true;
            }
        });
        startButton.style.display = 'none';
        cancelButton.style.display = 'block';
    },
    // Блокировать все инпуты
    blockAllInputs: function () {
        allInputs.forEach(function (item) {
            if (item.type == "text") {
                item.disabled = true;
            }
        });
        startButton.style.display = 'none';
        cancelButton.style.display = 'block';
    },

    reset: function (bindSite) {
        function resetInputs() {
            let inputs = document.getElementsByTagName('input');
            for (let key in inputs) {
                if (inputs[key].type == "text") {
                    inputs[key].value = '';
                    inputs[key].disabled = false;
                } else if (inputs[key].type == "range") {
                    inputs[key].value = 1;
                }
            }
            periodAmount.textContent = '1';
        }
        resetInputs();
        cancelButton.style.display = 'none';
        startButton.style.display = 'block';

        function resetResult() {
            budgetMonthValue.value = 0;
            budgetDayValue.value = 0;
            expensesMonthValue.value = 0;
            additionalExpensesValue.value = '';
            additionalIncomeValue.value = '';
            targetMonthValue.value = '';
            incomePeriodValue.value = 0;
        };
        resetResult();

        function resetAppData() {
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = +0;
            this.moneyDeposit = +0;
            this.budget = 0;
            this.budgetDay = +0;
            this.budgetMonth = +0;
            this.expensesMonth = +0;
        };
        resetAppData.call(bindSite);
    },
};

startButton.addEventListener('click', appData.start.bind(appData));
cancelButton.addEventListener('click', appData.reset.bind(appData, appData));
incomePlusButton.addEventListener('click', appData.addIncomeBlock);
expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.getPeriodSelect.bind(appData));