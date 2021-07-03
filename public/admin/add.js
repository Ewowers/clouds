let li = document.querySelectorAll('.rows');
let basket = [];

let uploade = () => {
  let html = basket.map((item, i) => {
    return `
        <li class='d-flex rows' data-id=${item.id}>
          <div class='col-4'>
            <p
              class='m-auto d-flex align-items-center'
              style='height: 100%;'
            >${item.name}</p>
          </div>
          <div class='col-2'> 
              <input type='text' class='form-control text-center quesss' value='${
                item.que
              }' />  
          </div>
          <div class='col-2'>
            <input type='number' value='${
              item.prise
            }' class='form-control prisesss' />
          </div>
          <div class='col-2'>
            <p
              class='m-auto d-flex align-items-center'
              style='height: 100%;'
            >${item.que * item.prise}</p>
          </div>
          <div class='col'>
            <button class='btn btn-light'>
                удалить
            </button>
          </div>
        </li>
        `;
  });
  document.querySelector('#json').innerHTML = html.join('');
  document.querySelectorAll('.quesss').forEach((item, i) => {
    item.addEventListener('change', () => fix(i, item.value, true));
  });
  document.querySelectorAll('.prisesss').forEach((item, i) => {
    item.addEventListener('change', () => fix(i, item.value, false));
  });
};
let Add = async (id) => {
  let xml = await fetch('/api/' + id, { method: 'GET' });
  let json = await xml.json();
  if (basket.find((item) => item.id == id)) {
    basket.find((item) => item.id == id).que += 1;
  } else {
    basket.push({
      name: json.name,
      id: id,
      prise: json.prise,
      que: 1,
    });
  }
  localStorage.setItem('add', JSON.stringify(basket));
  uploade();
};
let fix = (i, val, type) => {
  if (type) basket[i].que = parseInt(val);
  else basket[i].prise = parseInt(val);
  localStorage.setItem('add', JSON.stringify(basket));
  uploade();
};
if (localStorage.getItem('add')) {
  basket = [...JSON.parse(localStorage.getItem('add'))];
  uploade();
}

li.forEach((item) => {
  item.addEventListener('click', () => {
    console.log('id : ' + item.dataset.id);
    Add(item.dataset.id);
  });
});

let start = async () => {
  let xml = await fetch('/add', {
    method: 'PUT',
    body: localStorage.getItem('add'),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (xml.ok) localStorage.setItem('add', []);
  basket = [];
  uploade();
};
document.querySelector('#start').onclick = start;
