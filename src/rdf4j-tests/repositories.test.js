test('add repository mem', async () => {
  const url = 'https://agentlab.ru/rdf4j-workbench/repositories/mem-rdf/create';
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      data:
        'type=memory&Repository+ID=mem&Repository+title=&Persist=true&Sync+delay=0&EvaluationStrategyFactory=org.eclipse.rdf4j.query.algebra.evaluation.impl.StrictEvaluationStrategyFactory',
    },
  }).then((r) => {
    console.log(r);
    return r;
  });
  expect(data).toBe('HTTP/1.1 204 NO CONTENT');
});

test('remove repository mem', async () => {
  const url = 'Request URL: https://agentlab.ru/rdf4j-workbench/repositories/NONE/delete';
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      data: 'id=mem',
    },
  }).then((r) => {
    console.log(r);
    return r;
  });
  expect(data).toBe('HTTP/1.1 204 NO CONTENT');
});
