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
