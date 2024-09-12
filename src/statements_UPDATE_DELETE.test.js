describe('test POST INSERT/DELETE statements', function() {
  const data = '{<http://exampleSub> <http://exampleSub> 28} ';

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

  it('insert statements to rdf repository without context ', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/query' + '?' + params;
    //проверка до добавления
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toEqual(0);

    //добавление
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/update';
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
      return r;
    });
  });

  it('check statements after insert to rdf repository without context', async () => {
    //проверка после
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());

    expect(dataSel.results.bindings.length).toBeGreaterThan(0);
  });

  it('delete statements to rdf repository without context', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    console.log(dataSel);
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);

    //удаление
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/update';
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

    //проверка после
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/somerepository/query' + '?' + params;
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
