describe('test POST INSERT/DELETE sparql-query with context', function() {
  const data = 'GRAPH <urn:sparql:tests:insert:data> {' + '<http://exampleSub> <http://exampleSub> 68} ';
  const datareq =
    'GRAPH <urn:sparql:tests:insert:data> {' + '<http://exampleSub> <http://exampleSub> 68 . ?s ?p ?o .} ';
  var params =
    'action=exec&' +
    'queryLn=SPARQL&' +
    'query=' +
    encodeURIComponent(
      'PREFIX foaf: <https://agentlab.ru/rdf4j-workbench/repositories> ' +
        'SELECT ?s ?p ?o  ' +
        'WHERE{ ' +
        datareq +
        '}',
    ) +
    '&' +
    'limit_query=100&' +
    'infer=true&';

  it('insert data to rdf repository with context ', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/query' + '?' + params;
    //проверка до добавления
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    const contexts = dataSel.results.bindings.map((binding) => ({
      sub: binding.s.value,
      obj: binding.o.value,
      pred: binding.p.value,
    }));

    expect(contexts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          obj: '68',
          pred: 'http://exampleSub',
          sub: 'http://exampleSub',
        }),
      ]),
    );

    //добавление
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/update';
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

  it('check data after insert to rdf repository with context', async () => {
    //проверка после
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());

    expect(dataSel.results.bindings.length).toBeGreaterThan(0);
    const contexts = dataSel.results.bindings.map((binding) => ({
      sub: binding.s.value,
      obj: binding.o.value,
      pred: binding.p.value,
    }));

    expect(contexts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          obj: '68',
          pred: 'http://exampleSub',
          sub: 'http://exampleSub',
        }),
      ]),
    );
  });

  it('delete data to rdf repository with context', async () => {
    var urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/query' + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    console.log(dataSel);
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);
    var contexts = dataSel.results.bindings.map((binding) => ({
      sub: binding.s.value,
      obj: binding.o.value,
      pred: binding.p.value,
    }));
    console.log(contexts);

    expect(contexts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          obj: '68',
          pred: 'http://exampleSub',
          sub: 'http://exampleSub',
        }),
      ]),
    );

    //удаление
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/update';
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
    urlprefix = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/query' + '?' + params;
    dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());

    contexts = dataSel.results.bindings.map((binding) => ({
      sub: binding.s.value,
      obj: binding.o.value,
      pred: binding.p.value,
    }));

    expect(contexts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          obj: '68',
          pred: 'http://exampleSub',
          sub: 'http://exampleSub',
        }),
      ]),
    );
  });
});
