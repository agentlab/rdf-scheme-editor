test('insert data - statement - to rdf repository without context', () => {
  const urlprefix = 'https://agentlab.ru/rdf4j-server/repositories/qqqqqq/statements';
  const query =
    '?update=PREFIX%20dc%3A%20%3Chttp%3A%2F%2Fld-r.org%2Fconfig%2Ffacetproperty_creator_adms3%3E%20INSERT%20DATA%7B%20GRAPH%20%3Chttp%3A%2F%2Fexample%2Fbooks%3E%20%7B%3Chttp%3A%2F%2Fexample%2Fbook0%2F%3E%20dc%3Atitle%20%22C%20book%22%7D%20%7D';
  // console.log(urlprefix + query);
  return fetch(urlprefix + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((r) => {
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});

test('delete data - statement - to rdf repository without context', () => {
  const urlprefix = 'https://agentlab.ru/rdf4j-server/repositories/qqqqqq/statements';
  const query =
    '?update=PREFIX%20dc%3A%20%3Chttp%3A%2F%2Fld-r.org%2Fconfig%2Ffacetproperty_creator_adms3%3E%20DELETE%20DATA%7B%20GRAPH%20%3Chttp%3A%2F%2Fexample%2Fbooks%3E%20%7B%3Chttp%3A%2F%2Fexample%2Fbook0%2F%3E%20dc%3Atitle%20%22C%20book%22%7D%20%7D';
  // console.log(urlprefix + query);
  return fetch(urlprefix + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((r) => {
    expect(r).toBeInstanceOf(Response);
    expect(r['status']).toEqual(200);
    return r;
  });
});
