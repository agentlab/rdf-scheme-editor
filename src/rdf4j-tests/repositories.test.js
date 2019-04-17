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
