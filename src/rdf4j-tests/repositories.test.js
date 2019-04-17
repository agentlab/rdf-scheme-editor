const url = 'https://agentlab.ru/rdf4j-server/repositories';

test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());

  //console.log(data);
  const repositories = data.results.bindings.map((binding) => ({
    key: binding.id.value,
    id: binding.id.value,
    title: binding.title.value,
    uri: binding.uri.value,
    readable: binding.readable.value,
    writable: binding.writable.value,
  }));

  expect(repositories.length).toBeGreaterThan(0);
});

test('insert data to rdf repository without context', () => {
  const url = 'http://agentlab.ru/rdf4j-server/repositories/1488/transactions';
  //   expect.assertions(1);
  return fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // data: {
    //   data:
    //     'INSERT%20%7B%3FS%20a%20%3Curn%3ASinger%3E%20%20%7D%20WHERE%20%7B%20%3FS%20%3Curn%3Aname%3E%20%22John%22%20%7D',
    // },
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    expect(r).toEqual('Response');
    return r;
  });
});
