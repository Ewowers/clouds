const { Router } = require('express');
const Product = require('../model/Product');
const router = Router();
router.get('/', async (req, res) => {
  let product = await Product.find().lean();
  let line = ['одноразки', 'девайс', 'жидкость', 'расходник'];
  product = product.map((item) => {
    return { ...item, line: line };
  });
  res.render('fixed', {
    admin: true,
    isFixed: true,
    product: product,
    line: line,
  });
});
router.put('/', async (req, res) => {
  let body = req.body;
  body.arr.forEach(async (element) => {
    console.log(element);
    await Product.findByIdAndUpdate(element.id, {
      name: element.name,
      prise: element.prise,
      type: element.type,
    });
  });
  let product = await Product.find();
  res.json(product);
});
router.delete('/', async (req, res) => {
  console.log(req.body);
  await Product.findByIdAndDelete(req.body.id);
  res.status(200).send(true);
});
module.exports = router;
