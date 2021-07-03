const router = require('express').Router();
const Product = require('../model/Product');
const Money = require('../model/MoneyModel');
const Day = require('../model/Day');
router.get('/', async function (req, res) {
  const product = await Product.find().lean();
  let type = product.map((item) => item.type);
  let line = new Set(type);

  res.render('cashier', {
    cashier: true,
    line: line,
    title: 'Режим кассира',
    product,
  });
});
const discont = (sum, discont) => {
  if (
    discont.money == 0 ||
    discont.money == null ||
    discont.money == undefined
  ) {
    return sum;
  } else if (discont.type) {
    return (sum / 100) * discont.money;
  } else {
    return sum - discont.money;
  }
};
router.post('/add', async (req, res) => {
  try {
    let days = new Date();
    days =
      days.getDate() + '/' + (days.getMonth() + 1) + '/' + days.getFullYear();
    let { basket, itog, type, time, day } = req.body;
    let money = {
      type: true,
      title: 'Продажа',
      time: time,
      summ: itog,
      sales: 'Розничный покупатель',
      author: req.cookies.name,
      paymentcategory: type,
      day: new Date().toLocaleDateString(),
      basket: basket,
      date: days,
    };
    let isMoney = new Money(money);
    await isMoney.save();
    req.body.basket.forEach(async (item) => {
      let que = item.que;
      let queProduct = await Product.findById(item.id);
      let sum = queProduct.que - que;
      await Product.findByIdAndUpdate(item.id, { que: sum });
    });
    res.status(200).json({ isTrue: true });
  } catch (e) {
    console.log(e);
    res.status(400).send(false);
  }
});
router.put('/vozrat', async (req, res) => {
  let summ = [...req.body];
  summ.forEach((item) => console.log(item.prise, item.que));
  summ = summ.map((item) => item.que * item.prise);
  console.log(summ);
  summ = eval(summ.join('+'));
  let dates = new Date();
  let money = {
    type: false,
    title: 'Возрат',
    time: dates.getHours() + ':' + dates.getMinutes(),
    summ: summ,
    sales: 'Розничный покупатель',
    author: req.cookies.name,
    paymentcategory: '',
    basket: req.body,
    date: new Date(),
    day: dates.toLocaleDateString(),
  };
  let isMoney = new Money(money);
  await isMoney.save();
  res.status(200).send(true);
});
module.exports = router;
