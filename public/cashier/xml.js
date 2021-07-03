let Fetch = async () => {
  let { int } = document.querySelector('.isItogsss').dataset;
  let { types } = document.querySelector('#inputSales').dataset;
  let dates = new Date();
  let obj = {
    basket: JSON.parse(localStorage.getItem('CloudShopAst')),
    itog: int,
    type: types,
    time: dates.getHours() + ':' + dates.getMinutes(),
    day:
      dates.getDate() +
      '.' +
      (dates.getMonth() + 1) +
      '.' +
      dates.getFullYear(),
  };
  let xml = await fetch('/cashier/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj),
  });
  if (xml.ok) {
    localStorage.clear();
    document.querySelector('#container').innerHTML = '';
    saleModal.hide();
    document.querySelector('.isItogs').innerText = '0тг';
  }
};
