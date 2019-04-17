const url = 'https://agentlab.ru/rdf4j-server/repositories';

test('the data is peanut butter', async () => {
    expect.assertions(1);
    const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/sparql-results+json'
        }
    });
    expect(data).toBe('peanut butter');
});

test('insert data to rdf repository without context', async () => {
    const url = '/rdf4j-server/repositories/1488/transactions/1?action=UPDATE'
    expect.assertions(1);
    const data = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            data: 'kek'
        },
    });
    expect(data).toBe('peanut butter');
});

test('insert data to rdf repository without context', async () => {
    const url = '/rdf4j-server/repositories/1488/transactions/1?action=UPDATE'
    expect.assertions(1);
    const data = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            data: 'kek'
        },
    });
    expect(data).toBe('peanut butter');
});