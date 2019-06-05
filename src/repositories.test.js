const repositories_url = 'https://agentlab.ru/rdf4j-server/repositories';

test('add repository mem', async () => {
  const url = 'https://agentlab.ru/rdf4j-workbench/repositories/NONE/create';
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      'type=memory&Repository+ID=mem&Repository+title=memmem&Persist=true&Sync+delay=0&EvaluationStrategyFactory=org.eclipse.rdf4j.query.algebra.evaluation.impl.StrictEvaluationStrategyFactory',
  }).then((r) => {
    return r;
  });

  const repositories_request = await fetch(repositories_url, {
    method: 'GET',
    headers: {
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  const repositories = repositories_request.results.bindings.map((binding) => ({
    id: binding.id.value,
    title: binding.title.value,
    uri: binding.uri.value,
    readable: binding.readable.value,
    writable: binding.writable.value,
  }));
  console.log(repositories);
  expect(repositories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 'mem',
      }),
    ]),
  );
});

test('remove repository mem', async () => {
  const url = 'https://agentlab.ru/rdf4j-workbench/repositories/NONE/delete';
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'id=mem',
  }).then((r) => {
    //console.log(r);
    return r;
  });

  const repositories_request = await fetch(repositories_url, {
    method: 'GET',
    headers: {
      Accept: 'application/sparql-results+json',
    },
  }).then((r) => r.json());
  const repositories = repositories_request.results.bindings.map((binding) => ({
    id: binding.id.value,
    title: binding.title.value,
    uri: binding.uri.value,
    readable: binding.readable.value,
    writable: binding.writable.value,
  }));

  //.catch(e => console.log(e));
  expect(repositories).toEqual(
    expect.arrayContaining([
      expect.not.objectContaining({
        id: 'mem',
      }),
    ]),
  );
});
