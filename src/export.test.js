const server_URL = 'https://agentlab.ru/rdf4j-workbench';
const prefix = '/repositories/rtrtrtr/export';

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

test('Events test', async () => {
  const data = await fetch(server_URL.concat(prefix), {
    method: 'GET',
    headers: headers,
  }).then((r) => r.json());

  const mydata = data.results.bindings.map((binding) => ({
    subject: binding.subject.value,
    predicate: binding.predicate.value,
    object: binding.object.value,
    context: binding.context.value,
  }));
  console.log(mydata);
});
