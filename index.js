const express = require('express');
const mongoose = require('mongoose');
const app = express();
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
//router
const auth = require('./router/auth/auth');
const admin = require('./router/admin/home');
const money = require('./router/admin/money');
const cashier = require('./router/cashier/cashier');
const api = require('./router/api/api.js');
const product = require('./router/admin/product');
const fixed = require('./router/admin/fixed');
const add = require('./router/admin/add');
const User = require('./router/auth/User');
let day = require('./router/day');
//code

app.engine(
  'hbs',
  exphbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');

//middlware
let date = new Date();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.redirect('/auth');
});

let testAuth = async (req, res, next) => {
  let user = await User.findById(req.cookies.id);
  if (!user) {
    res.redirect('/auth');
  }

  next();
};
let isCashier = async (req, res, next) => {
  let user = await User.findById(req.cookies.id);

  if (req.url === '/auth') next();
  else if (user.position == 'cashier') res.redirect('/cashier');
  if (user.position == 'admin' && user.position == 'программист') {
    res.redirect('/cashier');
  }
  next();
};

app.use('/auth', auth);
app.use('/admin', testAuth, isCashier, admin);
app.use('/money', testAuth, isCashier, money);
app.use('/product', testAuth, isCashier, product);
app.use('/api', testAuth, api);
app.use('/cashier', testAuth, cashier);
app.use('/fixed', testAuth, isCashier, fixed);
app.use('/add', testAuth, isCashier, add);
app.use('/day', day);
const port = process.env.PORT_APP || 8080;
async function start() {
  try {
    const url =
      'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(port, function () {
      console.log('http://localhost:' + port);
    });
  } catch (e) {
    console.log(`http://localhost:${port}`);
  }
}
start();

// mongodb+srv://Ewower:Muhamet12@cluster0.5f5rj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
