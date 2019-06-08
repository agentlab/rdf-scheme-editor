const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/transactions';

test('Sparql query test with PUT request', async () => {
  const tID = await fetch(url, {
    method: 'POST',
  }).then((r) => r.headers.get('Location'));

  expect(tID).not.toBe(null);
  const trURL = tID.concat('?action=GET');

  const result = await fetch(trURL, {
    method: 'POST',
    accept: '*/*',
    Connection: 'keep-alive',
  }).then((r) => {
    expect(r.status).toBe(200);
    expect(r.headers.get('content-type')).toBe('application/n-triples;charset=UTF-8');
  });
});
