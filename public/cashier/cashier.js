let search = (e) => {
  let val = e.target.value.toLowerCase();
  let card = document.querySelectorAll('.card');
  card.forEach((item) => {
    console.log(item);
    if (item.dataset.name.toLowerCase().indexOf(val) != -1) {
      item.classList.remove('hide');
    } else item.classList.add('hide');
  });
};
let sorting = (e) => {
  let val = e.target.value.toLowerCase();
  let card = document.querySelectorAll('.card');
  card.forEach((item) => {
    console.log(item);
    if (val === 'all') item.classList.remove('hide');
    else if (item.dataset.type.toLowerCase() == val) {
      item.classList.remove('hide');
    } else item.classList.add('hide');
  });
};
document.querySelector('#search').addEventListener('input', search);
document.querySelector('#sort').addEventListener('input', sorting);
const percent = (numb, discont) => {
  let percent = discont.money; // Нужный процент
  let numb_percent;
  if (discont.type) numb_percent = (numb / 100) * percent;
  else return numb - percent;
  if (percent == 0) return numb;
  return numb - numb_percent; // Прибавляем к числу значение процента
};
//basket
var discontModal = new bootstrap.Modal(document.getElementById('discont'), {
  keyboard: false,
});
if (JSON.parse(localStorage.getItem('CloudShopAst'))) {
  upload();
}
let add = async (id) => {
  let xml = await fetch('/api/' + id, { method: 'get' });
  let json = await xml.json();
  let obj = {
    discont: { money: 0, type: true },
    id: id,
    name: json.name,
    prise: json.prise,
    que: 1,
  };
  let basket = JSON.parse(localStorage.getItem('CloudShopAst')) || [];
  if (basket.find((item) => item.id == obj.id)) {
    basket.find((item) => item.id == obj.id).que += 1;
  } else basket.push(obj);
  localStorage.setItem('CloudShopAst', JSON.stringify(basket));
  upload();
};
let remove = (id) => {
  let basket = JSON.parse(localStorage.getItem('CloudShopAst'));
  basket.splice(id, 1);
  localStorage.setItem('CloudShopAst', JSON.stringify(basket));
  upload();
};
let fixedProcent = (val = 0, i = 0, type) => {
  if (val == undefined || val == null || val == '') val = 0;
  let basket = JSON.parse(localStorage.getItem('CloudShopAst'));
  if (type) basket[i].discont = { money: val, type: true };
  else basket[i].discont = { money: val, type: false };
  localStorage.setItem('CloudShopAst', JSON.stringify(basket));
  upload();
};
let ques = (val, i) => {
  let basket = [...JSON.parse(localStorage.getItem('CloudShopAst'))];
  basket[i].que = parseInt(val);
  localStorage.setItem('CloudShopAst', JSON.stringify(basket));
  upload();
};
function upload() {
  let basket = JSON.parse(localStorage.getItem('CloudShopAst')) || [];
  let html = basket.map((item) => {
    return `
  <div class='row border-bottom align-items-center'>
    <div class='col-3'>${item.name}</div>
    <div class='col-2'>${item.prise}</div>
    <div class='col-2'>
      <input
        type='number'
        class='w-100 form-control-sm form-control bg-warning ques'
        value='${item.que}'
      />
    </div>
    <div class='col-2'>
      <button
        class='btn-warning w-100 discont'
        style='
          border-radius: .2rem;
          border: 1px solid #fff;
          padding: .25rem .5rem;
          min-height: calc(1.5em + .5rem + 2px)
          '
      >${
        item.discont.type ? item.discont.money + '%' : item.discont.money + 'тг'
      }</button>
    </div>
    <div class='col-2'>${percent(item.que * item.prise, item.discont)}</div>
    <div class='col-1'>
      <button class='btn' data-id=${
        item.id
      }><i class='bi bi-trash remove'></i></button>
    </div>
  </div>
    `;
  });
  document.querySelector('#container').innerHTML = html.join('');
  document.querySelectorAll('#container .ques').forEach((item, i) => {
    item.addEventListener('change', () => ques(item.value, i));
  });
  document.querySelectorAll('.discont').forEach((element, i) => {
    element.onclick = () => {
      document
        .querySelectorAll('#discont input')[0]
        .addEventListener('input', function () {
          fixedProcent(this.value, i, true);
        });
      document
        .querySelectorAll('#discont input')[1]
        .addEventListener('input', function () {
          fixedProcent(this.value, i, false);
        });
      document.querySelector('#discont #exampleModalLabel').innerText =
        basket[i].name;
      document.querySelector('#discont #isPredItogModalDiscont').innerText =
        basket[i].prise * basket[i].que;
      document.querySelector('#discont #isItogModalDiscont').innerText =
        percent(basket[i].prise * basket[i].que, basket[i].discont);

      discontModal.show();
    };
  });
  document
    .querySelectorAll('.remove')
    .forEach((item, i) => (item.onclick = () => remove(i)));

  let itog = JSON.parse(localStorage.getItem('CloudShopAst'));
  itog = itog
    .map((item) => percent(item.que * item.prise, item.discont))
    .join('+');
  itog = eval(itog);
  document.querySelector('.isItogs').innerText = itog;
}
document.querySelectorAll('.card').forEach((item) => {
  item.onclick = () => {
    add(item.id);
  };
});
document.querySelector('#clear').onclick = function () {
  localStorage.clear();
  upload();
};

let saleModal = new bootstrap.Modal(document.querySelector('#saleModal'), {});
let btnListInner = (type = 'Наличные') => {
  let sale = [200, 500, 1000, 1500, 2000, 2500, 5000, 7000, 7500, 10000];
  let kaspi = [1500, 2500, 3500, 5000, 7000, 7500, 10000];
  let qr = [1500, 2500, 3500, 5000, 7000, 7500, 10000];
  let arr = [];
  if (type === 'Наличные') arr = [...sale];
  else arr = [...kaspi];
  let html = arr.map((item) => {
    return `<button class="btn btn-outline-success" data-sale="${item}">${item}</button>`;
  });
  document.querySelector('.btnList').innerHTML = html.join('');
  changes();
};
let typeInput = (type = 'Наличные') => {
  document.querySelector('#inputSales').dataset.types = type;
  document.querySelector('#TextSales').innerText = type;
  btnListInner(type);
};
let typeButton = () => {
  let btn = document.querySelectorAll('.btnListType .btn');
  btn.forEach((item, i) => {
    item.addEventListener('click', () => {
      btn.forEach((element, j) => {
        if (i != j) {
          let classNames = element.className.split(' ');
          let test = classNames[1].split('-');
          if (test.length < 3) test.splice(1, 0, 'outline');
          element.className = 'btn ' + test.join('-');
        } else {
          let classNames = element.className.split(' ');
          let classNames2 = classNames[1].split('-');
          classNames2.splice(1, 1);
          element.className = classNames[0] + ' ' + classNames2.join('-');
          typeInput(element.dataset.type);
        }
      });
    });
  });
};
let changes = () => {
  document.querySelectorAll('.btnList .btn').forEach((item) => {
    item.addEventListener('click', () => {
      let input = document.querySelector('#inputSales');
      if (input.value == '') {
        input.value = parseInt(item.innerText);
        return;
      }
      let int = parseInt(input.value) + parseInt(item.innerText);
      input.value = int;
      sdacha();
    });
  });
};
let changeInput = (val = '0') => {
  val = parseInt(val);
  let itog = document.querySelector('.isItogsss').dataset.int;
  itog = parseInt(itog);
  document.querySelector('#surrender').innerText = val - itog + 'тг';
  sdacha();
};
let sdacha = () => {
  let itog = document.querySelector('.isItogsss').dataset.int;
  let val = document.querySelector('#inputSales').value;
  let btn = document.querySelector('#start');
  val = parseInt(val);
  itog = parseInt(itog);
  document.querySelector('#inputSales').addEventListener('input', function () {
    changeInput(this.value);
  });
  if (itog - val <= 0) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};
document.querySelector('#sale').addEventListener('click', function () {
  typeButton();
  typeInput();
  let basket = JSON.parse(localStorage.getItem('CloudShopAst'));
  basket = basket.map((item) => percent(item.prise * item.que, item.discont));
  basket = eval(basket.join('+'));
  document.querySelector('.isItogsss').innerText = basket + 'тг';
  document.querySelector('.isItogsss').dataset.int = basket;
  sdacha();
  saleModal.show();
});
