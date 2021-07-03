const router = require('express').Router();
const User = require('./User');

function authorization(user, post, res) {
  if (!user) {
    res.render('auth', { error: 'логин не правильный' });
  } else if (user.password != post.password) {
    res.render('auth', { error: 'пороль не правильный' });
  } else if (user.position === 'admin' || user.position === 'программист') {
    res.cookie('id', user._id);
    res.cookie('name', user.name);
    res.cookie('status', user.position);
    res.redirect('/admin');
  } else {
    res.cookie('id', user._id);
    res.cookie('name', user.name);
    res.cookie('status', user.position);
    res.redirect('/cashier');
  }
}
router.get('/', async function (req, res) {
  let users = await User.find();
  console.log(users);
  let user = await User.findById(req.cookies.id);
  if (user) {
    if (user.position == 'cashier') res.redirect('/cashier');
    else res.redirect('/admin');
  } else res.render('auth', { error: 'Авторизация' });
});
router.post('/', async function (req, res) {
  const user = await User.findOne({ name: req.body.name });
  console.log(user);
  authorization(user, req.body, res);
});

module.exports = router;
