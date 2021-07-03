const { Router } = require('express');
const MoneyModel = require('../model/MoneyModel');
const Product = require('../model/Product');
const router = Router();
router.get('/', async function (req, res) {
  let product = await Product.find({}).lean();
  res.render('add', { isAdd: true, admin: true, product: product });
});
router.put('/', async (req, res) => {
  let arr = req.body;
  arr.forEach(async (element) => {
    let que = await Product.findById(element.id);
    await Product.findByIdAndUpdate(element.id, { que: que.que + element.que });
  });
  let summ = arr.map((item) => item.que * item.prise).join('+');
  summ = eval(summ);
  let date = new Date();
  let money = new MoneyModel({
    type: false,
    title: 'Закуп',
    time: date.getHours() + ':' + date.getMinutes(),
    summ: summ,
    sales: req.cookies.name,
    author: 'Админ',
    paymentcategory: '',
    basket: arr,
    date: new Date(),
  }).save();
  res.status(200).json({ name: 'name' });
});
module.exports = router;
