describe('Тестирование ADD и DELETE запросы на обновление данных из файла в RDF репозитории с PUT запросом и транзакциями', () => {
  const urlOfRepo = 'https://agentlab.ru/rdf4j-workbench/repositories/iu3test';
  const urlForOpenTransaction = 'https://agentlab.ru/rdf4j-server/repositories/iu3test/transactions';
  const data = 'GRAPH <urn:sparql:tests:insert:data> {<http://student21> <http://result> 201} ';

  const forAskQuery = 'action=exec&queryLn=SPARQL&query=' + encodeURIComponent('ASK{' + data + '}');

  const urlQuery = urlOfRepo + '/query?' + forAskQuery;
  const urlUpdate = urlOfRepo + '/update';

  it('Тестирование ADD запроса на обновление данных из файла в RDF репозитории', async () => {
    const queryForAdd = `INSERT DATA {${data}}`;

    let resp = await fetch(urlQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/sparql-query',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(resp.boolean).toEqual(false);
    console.log('ADD', resp);

    resp = await fetch(urlUpdate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-query',
      },
      body: 'update=' + encodeURIComponent(queryForAdd),
    }).then((r) => r.text());
    // console.log(resp);

    resp = await fetch(urlQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/sparql-query',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(resp.boolean).toEqual(true);
    console.log('ADD', resp);
  });

  it('Тестирование DELETE запроса на обновление данных из файла в RDF репозитории', async () => {
    const queryForDelete = `DELETE DATA {${data}}`;

    let resp = await fetch(urlQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/sparql-query',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(resp.boolean).toEqual(true);
    console.log('DELETE', resp);

    resp = await fetch(urlUpdate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-query',
      },
      body: 'update=' + encodeURIComponent(queryForDelete),
    }).then((r) => r.text());
    // console.log(resp);

    resp = await fetch(urlQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/sparql-query',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    expect(resp.boolean).toEqual(false);
    console.log('DELETE', resp);
  });

  it('Тестирование ADD и DELETE запросы на обновление данных из файла в RDF репозитории с транзакциями', async () => {
    const queryForADD = `INSERT DATA {${data}}`;
    const queryForDELETE = `DELETE DATA {${data}}`;
    let location =
      'https://agentlab.ru/rdf4j-server/repositories/iu3test/transactions/33cb9093-41b9-4583-a47e-0309c9f713b5';

    await fetch(urlForOpenTransaction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      body: urlForOpenTransaction,
    }).then((r) => {
      expect(r).toBeInstanceOf(Response);
      expect(r.status).toEqual(201);
      location = r.headers.get('location');
    });

    const urlForTransaction = location + '?action=UPDATE';

    await fetch(urlForTransaction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      body: 'update=' + encodeURIComponent(queryForADD),
    }).then((r) => {
      expect(r).toBeInstanceOf(Response);
      expect(r.status).toEqual(204);
    });

    await fetch(urlForTransaction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      body: 'update=' + encodeURIComponent(queryForDELETE),
    }).then((r) => {
      expect(r).toBeInstanceOf(Response);
      expect(r.status).toEqual(204);
    });

    console.log('URL', location);
    await fetch(location + '?action=COMMIT', {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
      // body: encodeURIComponent('DELETE{' + location + '}'),
    }).then((r) => {
      expect(r).toBeInstanceOf(Response);
      expect(r.status).toEqual(200);
    });
  });
});
