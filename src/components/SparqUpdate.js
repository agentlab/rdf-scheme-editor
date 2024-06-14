describe('test update statement', function() {
    var urlprefixReq = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests';
    const data =
      '<http://exampleSub> <http://examplePred> <http://exampleObj>. ' +
      'GRAPH <urn:sparql:tests:insert:data> {' +
      '<http://exampleSub> <http://examplePred> 902} ';
    var params =
      'action=exec&' +
      'queryLn=SPARQL&' +
      'query=' +
      encodeURIComponent('PREFIX foaf: <' + urlprefixReq + '> ' + 'SELECT ?Subject ' + 'WHERE{ ' + data + '}') +
      '&' +
      'limit_query=100&' +
      'infer=true&';
    it('insert statements to rdf repository with context', async () => {
      var urlprefix = urlprefixReq + '?' + params;
      var dataSel = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());
      expect(dataSel.results.bindings.length).toEqual(0);
  
      
      var paramsGet = 'query=' + encodeURIComponent('INSERT DATA' + '{' + data + '}');
      urlprefix = urlprefixReq + '/statements';
      var result = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => {
        console.log(r);
        expect(r).toBeInstanceOf(Response);
        expect(r['status']).toEqual(406);
        return r;
      });
    });
  
    it('check statements after insert to rdf repository with context', async () => {
      var urlprefix = urlprefixReq + '?' + params;
      var dataSel = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());
      expect(dataSel.results.bindings.length).toEqual(0);
    });
  
    it('delete statements to rdf repository with context', async () => {
      urlprefix = urlprefixReq + '/statements';
      var result = await fetch(urlprefix, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
        body: 'update=' + encodeURIComponent('INSERT DATA' + '{' + data + '}'),
      }).then((r) => {
        console.log(r);
        expect(r).toBeInstanceOf(Response);
        expect(r['status']).toEqual(204);
        return r;
      });
      var urlprefix = urlprefixReq + '?' + params;
      var dataSel = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());
      expect(dataSel.results.bindings.length).toBeGreaterThan(0);
  
      var paramsGet = 'query=' + encodeURIComponent('DELETE DATA' + '{' + data + '}');
      urlprefix = urlprefixReq + '/statements'
      var result = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => {
        console.log(r);
        expect(r).toBeInstanceOf(Response);
        expect(r['status']).toEqual(406);
        return r;
      });
  
      urlprefix = urlprefixReq + '?' + params;
      dataSel = await fetch(urlprefix, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }).then((r) => r.json());
      expect(dataSel.results.bindings.length).toBeGreaterThan(0);
  
  
      urlprefix = urlprefixReq + '/statements';
      var result = await fetch(urlprefix, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
        body: 'update=' + encodeURIComponent('DELETE DATA' + '{' + data + '}'),
      }).then((r) => {
        console.log(r);
        expect(r).toBeInstanceOf(Response);
        expect(r['status']).toEqual(204);
        return r;
      });
    });
  });