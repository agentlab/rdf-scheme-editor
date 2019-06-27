const url = 'https://agentlab.ru/rdf4j-workbench/repositories/rtrtrtr/query';

test('test size get', async () => {
  const transactionData = await fetch(url, {
    method: 'GET',
  });
  let locationURL = transactionData.headers.get('Location');
  expect(locationURL).not.toBeNull();

  var transactionURL = locationURL.concat('Length');
  console.warn(transactionURL);

  try {
    const queryResult = await fetch(transactionURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error(error);
  }
});
