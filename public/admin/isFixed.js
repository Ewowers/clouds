let row = document.querySelectorAll('.isRow');
let name = document.querySelectorAll('.ProductName');
let prise = document.querySelectorAll('.ProductPrise');
let que = document.querySelectorAll('.ProductQues');
let type = document.querySelectorAll('.ProductType');
let deletes = document.querySelectorAll('.deletes');
deletes.forEach((item) => {
  item.onclick = async () => {
    let xml = await fetch('/fixed', {
      method: 'delete',
      body: JSON.stringify({ id: item.dataset.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (xml.ok) item.target.parentNode.parentNode.remove();
  };
});
let body = [];
let xml = async () => {
  row.forEach((item, i) => {
    let bol = document.querySelectorAll('.deletes')[i].dataset.type;
    let elems = {
      id: row[i].id,
      name: name[i].value,
      prise: prise[i].value,
      type: type[i].value,
      que: que[i].value,
    };
    body.push(elems);
  });
  let fet = await fetch('/fixed', {
    method: 'PUT',
    body: JSON.stringify({ arr: body }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
document.querySelector('#fixed').onclick = xml;
