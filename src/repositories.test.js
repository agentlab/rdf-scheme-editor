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
    //console.log(r);
    return r;
  });
  expect(data.status).toBe(200);
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
  //.catch(e => console.log(e));
  expect(data.status).toBe(200);
});
