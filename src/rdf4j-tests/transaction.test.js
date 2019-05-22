const url = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests/transactions';

test('test transaction', async () => {
  const transactionData = await fetch(url, {
    method: 'POST',
  });
  let locationURL = transactionData.headers.get('Location');
  expect(locationURL).not.toBeNull();

  var transactionURL = locationURL.concat('?action=SIZE');
  console.warn(transactionURL);

  try {
    const queryResult = await fetch(transactionURL, {
      method: 'PUT',
      headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain',
      },
      //body: 'update=INSERT%20%7B%3FS%20a%20%3Curn%3ASinger%3E%20%20%7D%20WHERE%20%7B%20%3FS%20%3Curn%3Aname%3E%20%22John%22%20%7D',
    });
  } catch (error) {
    console.error(error);
  }
});
