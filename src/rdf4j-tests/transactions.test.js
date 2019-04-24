const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/transactions';

test('test transaction', async () => {
  //expect.assertions(1);
  const transactionData = await fetch(url, {
    method: 'POST',
  });
  console.log(transactionData);
  let locationURL = transactionData.headers.get('Location'); // null
  console.warn(locationURL);
  expect(locationURL).not.toBeNull();
});
