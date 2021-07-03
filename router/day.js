let router = require('express').Router();
let Money = require('./model/MoneyModel');
router.post('/', async (req, res) => {
  let da = new Date();
  let money = await Money.find();
  money.forEach(async (element) => {
    await Money.findByIdAndDelete(element._id);
  });
  console.log(money);
  res.json({ name: 'name' });
});
module.exports = router;
