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
  BudgetMonth;

console.log('typeof money:', typeof (money));
console.log('typeof income:', typeof (income));
console.log('typeof deposit:', typeof (deposit));

BudgetMonth = +(money - (firstExpensesCost + secondExpensesCost + thirdExpensesCost + fourtheExpensesCost));
console.log('BudgetMonth: ', BudgetMonth);

period = Math.ceil(mission / BudgetMonth);
console.log('period: ', period + ' месяцев');

budgetDay = Math.floor(BudgetMonth / 30);
console.log('budgetDay: ', budgetDay);

budgetDay >= 800 ? console.log('Высокий уровень дохода') : budgetDay >= 300 ? console.log('Средний уровень дохода') : budgetDay >= 0 ? console.log('Низкий уровень дохода') : console.log('Что то пощло не так');