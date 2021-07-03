const router = require('express').Router();
let isMoney = require('../model/MoneyModel');
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
    if (
      item.paymentcategory.kaspi == null ||
      item.paymentcategory.kaspi == undefined ||
      item.paymentcategory.kaspi == ''
    ) {
      item.paymentcategory = 'Наличка: ' + item.paymentcategory.sale;
    } else if (
      item.paymentcategory.sale == null ||
      item.paymentcategory.sale == undefined ||
      item.paymentcategory.sale == ''
    ) {
      item.paymentcategory = 'Каспи: ' + item.paymentcategory.kaspi;
    } else {
      item.paymentcategory = `каспи: ${item.paymentcategory.kaspi}
      нал: ${item.paymentcategory.sale}`;
    }
  });
  res.render('product', { isProduct: true, admin: true, money: money, line });
});
module.exports = router;
