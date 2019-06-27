const server_URL = 'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/explore';
const param = '?resource=';
const prefix = '%3Chttp%3A%2F%2Fwww.example.org%2Fschemas%2Frelationship%2FfatherOf%3E&limit_explore=';
const wrong = '/resource=';
const fullAdress =
  'https://agentlab.ru/rdf4j-workbench/repositories/rpo-tests/explore?resource=<http%3A%2F%2Fwww.example.org%2Fschemas%2Frelationship%2FfatherOf>&limit_explore=10&show-datatypes=show-dataypes&offset=0&know_total=12&query=&ref=';

const props = ['subject', 'predicate', 'object', 'context'];

const props_wrong = ['subject_wrong', 'predicate_wrong', 'object_wrong', 'context_wrong'];

var headers = new Headers();
headers.append('Content-Type', 'application/json');

let webData = fetch(server_URL.concat(param.concat(prefix)), {
  method: 'GET',
  headers: headers,
});

let wrongWebData = fetch(server_URL.concat(wrong), {
  method: 'GET',
  headers: headers,
});

let tableinfo = fetch(fullAdress, {
  method: 'GET',
  headers: {
    Accept: 'application/sparql-results+json',
  },
});

let tableinfo_wrong = fetch(fullAdress, {
  method: 'GET',
  headers: {
    Accept: 'application/sparql-results+json',
  },
});

test('Web request GOOD', async () => {
  await webData.then((r) => {
    expect(r.status).toEqual(200);
  });
});

test('Web request BAD', async () => {
  await wrongWebData.then((r) => {
    expect(r.status).not.toEqual(200);
  });
});

test('Information is correct', async () => {
  const data = await tableinfo.then((r) => r.json());

  data.results.bindings.forEach((dataElement) => {
    props.forEach((property) => {
      expect(dataElement).toHaveProperty(property);
    });
  });
});

test('Wrong information for repository', async () => {
  const data = await tableinfo_wrong.then((r) => r.json());

  data.results.bindings.forEach((dataElement) => {
    props_wrong.forEach((property) => {
      expect(dataElement).not.toHaveProperty(property);
    });
  });
});
