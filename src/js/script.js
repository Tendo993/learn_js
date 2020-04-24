'use strict';

let money;
let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 50000);
    money = +money;
    console.log('money: ', money);
  } while (isNaN(money) || money == '' || money == null);
}
start();

let income = prompt('Ваши источники дохода?', 'Работа, Премия, Фриланс'),
  addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'Чай, Кофе, Жвачка'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  period,
  budgetDay,
  BudgetMonth,
  accumulatedMonth;

let showTypeOf = function (item) {
  console.log(typeof item);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1,
  expenses2,
  expenses3,
  expenses4;

let expensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      expenses1 = prompt('Какие обязательные расходы у вас есть?', 'Кварплата');
      let exp;
      do {
        exp = prompt('Во сколько это обойдется?', '6000');
      } while (isNaN(exp) || exp == '' || exp == null);
      sum += +exp;
    } else if (i === 1) {
      expenses2 = prompt('Какие обязательные расходы у вас есть?', 'Продукты');
      let exp;
      do {
        exp = prompt('Во сколько это обойдется?', '10000');
      } while (isNaN(exp) || exp == '' || exp == null);
      sum += +exp;
    } else if (i === 2) {
      expenses3 = prompt('Какие обязательные расходы у вас есть?', 'Бензин');
      let exp;
      do {
        exp = prompt('Во сколько это обойдется?', '4000');
      } while (isNaN(exp) || exp == '' || exp == null);
      sum += +exp;
    } else if (i === 3) {
      expenses4 = prompt('Какие обязательные расходы у вас есть?', 'Коммуналка');
      let exp;
      do {
        exp = prompt('Во сколько это обойдется?', '1000');
      } while (isNaN(exp) || exp == '' || exp == null);
      sum += +exp;
    }
  }
  return sum;
}

let expensesAmount = expensesMonth();

let getAccumulatedMonth = function () {
  return +(money - expensesAmount);
};

accumulatedMonth = getAccumulatedMonth();
console.log('accumulatedMonth: ', accumulatedMonth);

BudgetMonth = +(money - expensesAmount);

let getTargetMonth = function () {
  return Math.ceil(mission / BudgetMonth);
}

period = getTargetMonth();

if (getTargetMonth() < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('period: ', period + ' месяцев');
}

let accumulatedPeriod = function () {
  return accumulatedMonth * period;
}
console.log('accumulatedPeriod: ', accumulatedPeriod());
budgetDay = Math.floor(BudgetMonth / 30);

let getStatusIncome = function () {
  if (budgetDay <= 0) {
    return ('Что-то пошло не так');
  } else if (budgetDay < 300) {
    return ('Низкий уровень дохода');
  } else if (budgetDay <= 800) {
    return ('Средний уровень дохода');
  } else {
    return ('Высокий уровень дохода');
  }
};
console.log('Уровень дохода: ', getStatusIncome());