const router = require('express').Router();
let isMoney = require('../model/MoneyModel');
const percent = (number, disconst = { type: false, money: 0 }) => {
  if (disconst.money) return number;
  if (disconst.type) {
    let percent = diconst.money;
    let number_percent = (number / 100) * percent;
    return number - number_percent;
  } else return number - disconst.money;
};
router.get('/', async function (req, res) {
  let money = await isMoney.find({}).lean();
  let date = new Set();
  money.forEach((item) => {
    date.add(item.day);
  });
  let line = [];

  date.forEach((item) => line.push({ day: item, arr: [] }));
  money.forEach((item) => {
    line.find((elem) => elem.day == item.day).arr.push(item);
  });
  money.forEach((item) => {
    let { basket } = item;
    let itog = basket.map((elems) => {
      return percent(elems.que * elems.prise, elems.diconst);
    });
    itog = eval(itog.join('+'));
    item.paymentcategory += ' ' + item.summ;
  });

  let test = [...line];

  test = test.map((item) => {
    item.cash = 0;
    item.noCash = 0;
    item.arr.forEach((elem) => {
      if (elem.type) item.cash += elem.summ;
      else item.noCash += elem.sum;
    });
    item.zp = item.cash - (item.cash / 100) * 95;
  });
  res.render('money', { isMoney: true, admin: true, money, line });
});
module.exports = router;
