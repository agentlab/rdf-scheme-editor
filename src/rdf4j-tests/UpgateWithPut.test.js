describe('test update', function () {

  const data =
    '<http://exampleSub> <http://examplePred> <http://exampleObj>. ' +
    'GRAPH <urn:sparql:tests:insert:data> {' +
    '<http://exampleSub> <http://exampleSub> 200} ';

  var params =
    'action=exec&' +
    'queryLn=SPARQL&' +
    'query=' +
    encodeURIComponent(
      'PREFIX foaf: <https://agentlab.ru/rdf4j-workbench/repositories> ' + 'SELECT ?Subject ' + 'WHERE{ ' + data + '}',
    ) +
    '&' +
    'limit_query=100&' +
    'infer=true&';


  it('update (insert) data to rdf repository with context', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/query' + '?' + params;

    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());

    expect(dataSel.results.bindings.length).toEqual(0);

    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/update';
    var result = await fetch(urlprefix, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      body: 'update=' + encodeURIComponent('INSERT DATA' + '{' + data + '}'),
    }).then((r) => {
      console.log(r);
      expect(r).toBeInstanceOf(Response);
      expect(r['status']).toEqual(200);
      return r;
    });
  });

  it('check data after update(insert) to rdf repository with context', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toEqual(0);
  });

  it('update (delete) data to rdf repository with context', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toEqual(0);
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/update';
    var result = await fetch(urlprefix, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + data + '}'),
    }).then((r) => {
      console.log(r);
      expect(r).toBeInstanceOf(Response);
      expect(r['status']).toEqual(200);
      return r;
    });
    dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toEqual(0);
  });
});
