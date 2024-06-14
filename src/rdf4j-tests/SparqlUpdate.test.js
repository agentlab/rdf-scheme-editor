describe('test update statement', function() {
  //ссылка по которой обращаемся
  var urlprefixReq = 'https://agentlab.ru/rdf4j-server/repositories/rpo-tests';
  //данные которые хотим добавить
  const data =
    '<http://exampleSub> <http://examplePred> <http://exampleObj>. ' +
    'GRAPH <urn:sparql:tests:insert:data> {' +
    '<http://exampleSub> <http://examplePred> 902} ';
    //параметры запроса для проверок
  var params =
    'action=exec&' +
    'queryLn=SPARQL&' +
    'query=' +
    encodeURIComponent('PREFIX foaf: <' + urlprefixReq + '> ' + 'SELECT ?Subject ' + 'WHERE{ ' + data + '}') +
    '&' +
    'limit_query=100&' +
    'infer=true&';
 //первый тест на добавление заявления (statements) данных, используем метод GET для запроса информации
  it('insert statements to rdf repository with context', async () => {
    var urlprefix = urlprefixReq + '?' + params;
    //проверка до добавления (мы хотим добавить данные, проверяем есть ли такие)
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    //ожидаем что таких данных нет (делаем запрос и узнаем длину строки), длина должна равняться нулю
    expect(dataSel.results.bindings.length).toEqual(0);

    //добавление
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

  //второй тест на проверку добавленного заявления данных, используем метод GET для запроса информации
  it('check statements after insert to rdf repository with context', async () => {
    //проверка после
    var urlprefix = urlprefixReq + '?' + params;
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    //ожидаем что таких данных нет(делаем запрос и узнаем длину строки),
    // так как через метод GET нельзя добавлять, длина равна нулю
    expect(dataSel.results.bindings.length).toEqual(0);
  });

  //третий тест на удаление данных, используем метод POST для добавления и метод GET для запроса информации  
  it('delete statements to rdf repository with context', async () => {
    //добавление, так как иначе нечего будет удалить
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
    //проверка до
    var dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    //ожидаем что таких данные есть(делаем запрос и узнаем длину строки), она должна быть больше нуля
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);

    //удаление, которое не получится, так как через метод GET можно только узнавать информацию
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

    //проверка после
    urlprefix = urlprefixReq + '?' + params;
    dataSel = await fetch(urlprefix, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json',
      },
    }).then((r) => r.json());
    //ожидаем что таких данные есть(делаем запрос и узнаем длину строки), она должна быть больше нуля
    expect(dataSel.results.bindings.length).toBeGreaterThan(0);


    //чистка добавленного, чтобы на засорять
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