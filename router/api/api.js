const router = require('express').Router();
const Money = require('../model/MoneyModel');
const Product = require('../model/Product');
let isMoney = require('../model/MoneyModel');
router.post('/Money', function (req, res) {
  let money = new Money({
    order: true,
    date: req.body.date,
    frofit: req.body.itog,
    consumption: 0,
    agent: req.body.agent,
    type: true,
    author: req.cookies.name,
  });
  money.save();
  res.send(true);
  res.status(200).send(true);
});
router.post('/create', function (req, res) {
  let product = new Product({
    name: req.body.name,
    prise: req.body.prise,
    que: req.body.que,
    type: req.body.type,
    visibility: req.body.visibility,
  })
    .save()
    .then(async () => {
      let all = await Product.find({});
      res.status(200).json(all);
    });
});
router.get('/:id', async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.status(200).json(product);
});
router.get('/money/:id', async (req, res) => {
  let money = await isMoney.findById(req.params.id);
  res.status(200).json(money);
});
router.post('/basket/:id', async (req, res) => {
  let money = await Money.find({ day: req.params.id });
  res.status(200).json(money);
});
module.exports = router;
