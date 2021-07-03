const { Router } = require('express');
const Product = require('../model/Product');
const router = Router();
router.get('/', async function (req, res) {
  let product = await Product.find({}).lean();
  product = product.map((item) => {
    return {
      name: item.name,
      prise: item.prise,
      que: item.que,
      visibility: item.visibility ? 'Да' : 'нет',
      PQ: item.que * item.prise,
    };
  });

  res.render('adminHome', { isHome: true, admin: true, product: product });
});
module.exports = router;
