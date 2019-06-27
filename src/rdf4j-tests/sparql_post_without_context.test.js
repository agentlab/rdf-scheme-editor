describe('test Post without context', function() {
  var urlprefixReq = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests';
  const data = '<http://exampleSub> <http://exampleSub> 87';
  var params =
    'action=exec&' +
    'queryLn=SPARQL&' +
    'query=' +
    encodeURIComponent('PREFIX foaf: <' + urlprefixReq + '> ' + 'SELECT ?Subject ' + 'WHERE{ ' + data + '}') +
    '&' +
    'limit_query=100&' +
    'infer=true&';

  it('insert data to rdf repository without context', async () => {
    var urlprefix = urlprefixReq + '?' + params;
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
    urlprefix = urlprefixReq + '/statements';
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
      expect(r['status']).toEqual(204);
      return r;
    });
  });

  it('check data after insert to rdf repository without context', async () => {
    //проверка после
    var urlprefix = urlprefixReq + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);
  });

  it('delete data to rdf repository without context', async () => {
    var urlprefix = urlprefixReq + '?' + params;
    //проверка до
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);

    //удаление
    urlprefix = urlprefixReq + '/statements';
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
      expect(r['status']).toEqual(204);
      return r;
    });

    //проверка после
    dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => {
      console.log(r);
      expect(r).toBeInstanceOf(Response);
      return r;
    });
  });
});
