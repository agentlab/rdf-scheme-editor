const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/transactions';

test('test transaction', async () => {
  const transactionData = await fetch(url, {
    method: 'POST',
  });
  let locationURL = transactionData.headers.get('Location');
  expect(locationURL).not.toBeNull();

  var transactionURL = locationURL.concat('?action=QUERY');
  console.warn(transactionURL);

  try {
    const queryResult = await fetch(transactionURL, {
      method: 'PUT',
      header: 'Accept: text/turtle',
    });
  } catch (error) {
    console.error(error); // 403 HTTP
  }
});
