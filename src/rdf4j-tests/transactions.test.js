const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/transactions';

test('adding triples with PUT query and transactions', async () => {
  const tID = await fetch(url, {
    method: 'POST',
  }).then((r) => r.headers.get('Location'));

  expect(tID).not.toBe(null);

  console.log(tID);

  const result = await fetch(tID + '?action=ADD', {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/turtle',
    },
    body:
      '<http://mythology.Greek.org/#Cronus> <http://www.example.org/schemas/relationship/fatherOf> <http://mythology.Greek.org/#Zeus> .',
  }).then((r) => r);

  console.log(result);
});
