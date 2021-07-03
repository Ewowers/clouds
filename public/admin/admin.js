const createNewProduct = async () => {
  let create = {
    name: document.querySelector('.createName').value.toLowerCase(),
    prise: document.querySelector('.createPrise').value.toLowerCase(),
    que: document.querySelector('.createQue').value.toLowerCase(),
    type: document.querySelector('.createType').value,
    vibility: Boolean(document.querySelector('.createvibility').value),
  };
  let xml = await fetch('/api/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(create),
  });
  let json = await xml.json();
  console.log(json);
};
