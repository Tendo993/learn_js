'use strict';

let money = +prompt('Ваш месячный доход?', 50000),
  income = prompt('Ваши источники дохода?', 'Работа, Премия, Фриланс'),
  addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'Чай, Кофе, Жвачка'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  firstExpenses = prompt('Какие обязательные расходы у вас есть?', 'Кварплата'),
  firstExpensesCost = +prompt('Во сколько это обойдется?', '6000'),
  secondExpenses = prompt('Какие обязательные расходы у вас есть?', 'Продукты'),
  secondExpensesCost = +prompt('Во сколько это обойдется?', '10000'),
  thirdExpenses = prompt('Какие обязательные расходы у вас есть?', 'Бензин'),
  thirdExpensesCost = +prompt('Во сколько это обойдется?', '4000'),
  fourthExpenses = prompt('Какие обязательные расходы у вас есть?', 'Коммуналка'),
  fourtheExpensesCost = +prompt('Во сколько это обойдется?', '1000'),
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

let getExpensesMonth = function () {
  return firstExpensesCost + secondExpensesCost + thirdExpensesCost + fourtheExpensesCost;
}

let getAccumulatedMonth = function () {
  return +(money - getExpensesMonth());
};
accumulatedMonth = getAccumulatedMonth();
console.log('accumulatedMonth: ', accumulatedMonth);


BudgetMonth = +(money - getExpensesMonth());

let getTargetMonth = function () {
  return Math.ceil(mission / BudgetMonth);
}

period = getTargetMonth();
console.log('period: ', period + ' месяцев');

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