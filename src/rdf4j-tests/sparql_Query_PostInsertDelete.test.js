const data = 'GRAPH <urn:sparql:tests:insert:data> {' + '<http://trang> <http://iu3> 61} '; // data (context) can insert/delete

// url dan toi cai repositorie cua minh, chi thay doi cai ten 'abc' nay, khong thay doi o dau nua
// tat ca tu dong thay doi theo
const myURL = 'https://agentlab.ru/rdf4j-workbench/repositories/trang';

var forAskQuery =
  'action=exec&' +
  'queryLn=SPARQL&' +
  'query=' +
  encodeURIComponent('PREFIX foaf:' + '<' + myURL + '>' + 'ASK' + '{' + data + '}');

const urlQuery = myURL + '/query' + '?' + forAskQuery; //for GET
const urlUpdate = myURL + '/update'; // for POST

test('insert context ', async () => {
  //check befor
  // ASK must be return FALSE,
  var dataSel = await fetch(urlQuery, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/sparql-query',
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  console.log(dataSel);

  //insert

  var result = await fetch(urlUpdate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-query',
    },
    body: 'update=' + encodeURIComponent('INSERT DATA' + '{' + data + '}'),
  }).then((r) => {});

  //now check again, ASK must return TRUE
  dataSel = await fetch(urlQuery, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/sparql-query',
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  console.log(dataSel);
});

test('delete context', async () => {
  //check before ,ASK must return TRUE
  var dataSel = await fetch(urlQuery, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/sparql-query',
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  console.log(dataSel);

  //delete
  var result = await fetch(urlUpdate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-query',
    },
    body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + data + '}'),
  }).then((r) => {});

  //now check again, ASK must return FALSE
  dataSel = await fetch(urlQuery, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/sparql-query',
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  console.log(dataSel);
});
