const server_URL = 'https://agentlab.ru/rdf4j-server';
const repositories_prefix = '/repositories';
const props = ['id', 'title', 'uri', 'readable', 'writable'];

let webData = fetch(server_URL.concat(repositories_prefix), {
  method: 'GET',
  headers: {
    Accept: 'application/sparql-results+json',
  },
});

test('Web request is made correctly', async () => {
  await webData.then((r) => {
    expect(r.status).toEqual(200);
  });
});

test('The repositories information is correct', async () => {
  const data = await webData.then((r) => r.json());

  expect(data).not.toBeUndefined();

  data.results.bindings.forEach((dataElement) => {
    props.forEach((property) => {
      expect(dataElement).toHaveProperty(property);
    });
  });
});
