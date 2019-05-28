test('insert data to rdf repository with context', async () => {
  const urlprefix = 'https://agentlab.ru/rdf4j-server/repositories/rtrtrtr/statements';
  const data = await fetch(urlprefix, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/rdf+xml',
    },
    query:
      'update=&#39;PREFIX dc: &lt;http://purl.org/dc/elements/1.1/&gt;\
      INSERT DATA{ GRAPH & lt; C1 & gt; {& lt; http://example/book1/&gt; dc:title &quot;C sword&quot;} }&#39; \
      &#39; http://localhost:8000/v1/graphs/sparql&#39;',
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});

test('delete data to rdf repository with context', async () => {
  const urlprefix = 'https://agentlab.ru/rdf4j-server/repositories/rtrtrtr/statements';
  const data = await fetch(urlprefix, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/rdf+xml',
    },
    query:
      'update=&#39;PREFIX dc: &lt;http://purl.org/dc/elements/1.1/&gt;\
      DELETE DATA{ GRAPH & lt; C1 & gt; {& lt; http://example/book1/&gt; dc:title &quot;C sword&quot;} }&#39; \
      &#39; http://localhost:8000/v1/graphs/sparql&#39;',
  }).then((r) => {
    console.log(r);
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});
