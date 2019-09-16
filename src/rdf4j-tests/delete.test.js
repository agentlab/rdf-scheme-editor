jest.setTimeout(50000);
var location = '';
var urlDir = 'https://agentlab.ru/rdf4j-server/repositories/sdf';
const data = '<http://exampleSub> <http://examplePred> <http://exampleObj>. ' +
  'GRAPH <urn:sparql:tests:insert:data> {' +
  '<http://exampleSub> <http://examplePred> 111} ';

test('Add transaction', async () => {
  const url = 'https://agentlab.ru/rdf4j-server/repositories/sdf/transactions';
  var result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    },
    body: url,
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(201);
    var loc = r.headers.get('location');
    location = loc;
    return r;
  });
});


test('Add data', async () => {
  //добавление
  const urlprefix = location + '?action=UPDATE';
  console.log(urlprefix);
  var result = await fetch(urlprefix, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //Accept: 'application/sparql-results+json',
    },
    body: 'update=' + encodeURIComponent('INSERT DATA' + '{' + data + '}'),
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});

test('Delete data', async () => {
  const urlprefix = location + '?action=UPDATE';
  var result = await fetch(urlprefix, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //Accept: 'application/sparql-results+json',
    },
    body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + data + '}'),
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});

test('Delete transaction', async () => {
  var result = await fetch(location, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    },
    body: encodeURIComponent('DELETE' + '{' + location + '}'),
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(204);
    return r;
  });
});
