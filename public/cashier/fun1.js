let history = document.querySelector('.history');
let his = async () => {
  let uuid = new Date();
  uuid = uuid.toLocaleDateString();
  console.log(uuid);
  let responce = await fetch('/api/basket/' + uuid, {
    method: 'POST',
  });
  let json = await responce.json();
  let str = `
    <div class='row'>
    <div class='col-1'>тип</div>
      <div class='col-md-5'>
        Корзина
      </div>
      <div class='col-md-2'>
        Итог
      </div>
      <div class='col-md-2'>
        Процент
      </div>
    </div>
  `;
  json.forEach((element) => {
    let strs = `
    <div class='row'>
     
      <div class='col-5'>
        Название
      </div>
      <div class='col-4'>
        Цена
      </div>
      <div class='col-2'>
        Кол
      </div> 
    </div>
    `;
    element.basket.forEach((item) => {
      strs += `
      <div class='row'>
        <div class='col-6 border-end'>
          ${item.name}
        </div>
        <div class='col-4 border-end'>
          ${item.prise}
        </div>
        <div class='col-2'>
          ${item.que}
        </div> 
      </div>
          `;
    });
    str += `
    <div class='row border-bottom'>
        <div class='col-md-1 text-center align-self-center'>
        ${
          element.type
            ? '<i class="fas fa-plus"></i>'
            : '<i class="fas fa-minus"></i>'
        }
        </div>
        <div class='col-md-5'>
          <div class='container-fluid'>${strs}</div>
        </div>
        <div class='col-md-2'>
        ${element.summ}
        </div>
        <div class='col-md-4'>
        ${element.summ - (element.summ / 100) * 95}
        </div>
    </div>
    `;
  });

  document.querySelector('.history').innerHTML = str;
  document.querySelector('.history').classList.toggle('activesss');
};
document.querySelector('#historys').addEventListener('click', his);

const vozratUploade = (arr = []) => {
  let html = arr.map((item, i) => {
    return `   
    <div class='row align-items-center border-bottom pb-1 mt-2' data-id=${item.id}>
        <div class='col-6'>
          ${item.name}
        </div>
        <div class='col-2'>
          <input
            type='text'
            value='${item.prise}'
            class='form-control form-control-sm text-center vozratPrise'
          />
        </div>
        <div class='col-2'>
          <input
            type='text'
            value='${item.que}'
            class='form-control form-control-sm text-center vozratQue'
          />
        </div>
        <div class='col-2'>
          <button class='btn btn-primary delete'  data-index='${i}'>
            <i class='bi bi-trash remove'></i>
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('#Vozrat #container').innerHTML = html.join('');
  document.querySelectorAll('#Vozrat #container .delete').forEach((item, i) => {
    item.addEventListener('click', () => vozratDelete(item.dataset.index));
  });
  document
    .querySelectorAll('#Vozrat #container .vozratPrise')
    .forEach((item, i) => {
      item.addEventListener('change', () => {
        vozratQue(i, item.value);
        console.log(item);
      });
    });
  document
    .querySelectorAll('#Vozrat #container .vozratQue')
    .forEach((item, i) => {
      item.addEventListener('change', () => {
        vozratPrise(i, item.value);
        console.log(item);
      });
    });
};
const vozratDelete = (i) => {
  let arr = JSON.parse(localStorage.getItem('vozrat'));
  arr.splice(i, 1);
  localStorage.setItem('vozrat', JSON.stringify(arr));
  vozratUploade(arr);
};
const vozratPrise = (i, val) => {
  val = parseInt(val);
  console.log(i);
  let arr = JSON.parse(localStorage.getItem('vozrat'));
  arr[i].prise = val;
  localStorage.setItem('vozrat', JSON.stringify(arr));
  vozratUploade(arr);
};
const vozratQue = (i, val) => {
  val = parseInt(val);
  console.log(i);
  let arr = JSON.parse(localStorage.getItem('vozrat'));
  arr[i].que = val;
  localStorage.setItem('vozrat', JSON.stringify(arr));
  vozratUploade(arr);
};
document.querySelectorAll('#Vozrat .listenVosrat p').forEach((item) => {
  item.addEventListener('click', function (e) {
    let arr = JSON.parse(localStorage.getItem('vozrat'));
    if (arr == undefined) arr = [];
    let obj = {
      id: e.target.dataset.id,
      name: e.target.innerText,
      prise: e.target.dataset.prise,
      que: 1,
    };
    console.log(obj);
    if (arr.find((element) => element.id == obj.id)) {
      arr.find((element) => element.id == obj.id).que += 1;
    } else arr.push(obj);
    localStorage.setItem('vozrat', JSON.stringify(arr));
  });
});
vozratUploade(JSON.parse(localStorage.getItem('vozrat')));

let vozratFetch = async () => {
  let body = JSON.parse(localStorage.getItem('vozrat'));

  let responce = await fetch('/cashier/vozrat', {
    method: 'put',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (responce.ok) {
    localStorage.setItem('vozrat', JSON.stringify([]));
    vozratUploade([]);
  }
};

const handOver = async () => {
  let body = {
    name: 'name',
  };
  console.log('click handOver');
  let responce = await fetch('/day', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
document.querySelector('#handOver', handOver);
