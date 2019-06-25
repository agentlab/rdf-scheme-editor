//POST  INSERT  DELETE
const data =
  '<http://exampleSub> <http://examplePred> <http://exampleObj>. ' +
  'GRAPH <urn:sparql:tests:insert:data> {' +
  '<http://exampleSub> <http://exampleSub> 62} ';

test('INSERT', async () => {
  var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/update';
  var result = await fetch(urlprefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-query',
    },
    body: 'update=' + encodeURIComponent('INSERT DATA' + '{' + data + '}'),
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
  });
});

test('DELETE', async () => {
  var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/update';
  var result = await fetch(urlprefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-query',
    },
    body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + data + '}'),
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});
