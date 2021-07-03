function percent(number, percent = 0) {
  if (percent.money < 1) return number;
  if (percent.type) return number - (number / 100) * percent.money;
  return number - percent.money;
}
let open = async (id) => {
  let xml = await fetch('/api/money/' + id, { method: 'GET' });
  xml = await xml.json();
  console.log(xml);
  document.querySelector('#modal').classList.toggle('activeModal');
  let basket = [
    `<div class='row'>
      <div class='col-4' style='border-right: 1px solid #fff;'>
        Название
      </div>
      <div class='col-2' style='border-right: 1px solid #fff;'>
        Цена
      </div>
      <div class='col-2' style='border-right: 1px solid #fff;'>
        Кол
      </div>
      <div class='col-2' style='border-right: 1px solid #fff;'>
        скидка
      </div>
      <div class='col-2'>
        итог
      </div>
    </div>`,
  ];
  xml.basket = xml.basket.map((item) => {
    let { discont } = item;
    console.log(discont);
    if (discont === undefined) item.discont = { type: true, money: 0 };
    return item;
  });
  xml.basket.forEach((item) => {
    basket.push(`
  <div class='row'>
    <div class='col-4' style='border-right: 1px solid #fff;'>
      ${item.name}
    </div>
    <div class='col-2' style='border-right: 1px solid #fff;'>
      ${item.prise}
    </div>
    <div class='col-2' style='border-right: 1px solid #fff;'>
      ${item.que}
    </div>
    <div class='col-2' style='border-right: 1px solid #fff;'>
      ${
        item.discont.type ? item.discont.money + '%' : item.discont.money + 'тг'
      }
    </div>
    <div class='col-2' style='border-right: 1px solid #fff;'>
      ${percent(item.que * item.prise, item.discont)}
    </div>
  </div>`);
  });
  let itog = eval(xml.basket.map((item) => item.que * item.prise).join('+'));
  let itogDiscont = eval(
    xml.basket
      .map((item) => percent(item.que * item.prise, item.discont))
      .join('+')
  );
  document.querySelector('#predItog').innerText = itog + 'тг';
  document.querySelector('#Itog').innerText = itogDiscont + 'тг';
  document.querySelector('#basket').innerHTML = basket.join('');
};
document.querySelectorAll('.isRow').forEach((item) => {
  item.addEventListener('click', () => open(item.dataset.id));
});
document.querySelector('#ModalClose').onclick = () => {
  document.querySelector('#modal').classList.remove('activeModal');
};
