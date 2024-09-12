describe('Pipeline Creation Test for UnifiedViews', function() {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const server_URL = 'http://82.202.226.30:8080';
  const prefix = '/master/api/1/pipelines';
  const prefix_2 = '/master/api/1/pipelines/?userExternalId=admin';
  const props = ['name', 'description'];

  var username = 'master';
  var password = 'commander';
  var headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  headers.append('Content-Type', 'application/json');

  const data = {
    name: 'Lal' + Math.floor(Date.now() / 1000),
    description: 'hehe',
    userExternalId: 'admin',
  };

  it('pipeline creation test', async () => {
    const dataSel = await fetch(proxy + server_URL.concat(prefix_2), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    //console.log(dataSel);
    const oldPipelines = dataSel.map((binding) => ({
      id: binding.id.value,
      name: binding.name.value,
      description: binding.description.value,
    }));

    //???before creation such pipeline doesn't exist, т.к. имя и описание может совпадать
    expect(oldPipelines).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: data.name,
          description: data.description,
        }),
      ]),
    );

    //Create a new pipeline
    const pipeline = await fetch(proxy + server_URL.concat(prefix), {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then((r) => r.json());
    console.log(pipeline);

    //Get new pipelines
    const dataSel2 = await fetch(proxy + server_URL.concat(prefix_2), {
      method: 'GET',
      headers: headers,
    }).then((r) => r.json());
    const newPipelines = dataSel2.map((binding) => ({
      id: binding.id.value,
      name: binding.name.value,
      description: binding.description.value,
    }));

    //Check if created pipeline really was created
    expect(newPipelines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: pipeline.id.value,
          name: pipeline.name.value,
          description: pipeline.description.value,
        }),
      ]),
    );
    // //Delete created pipeline after test
    // const deleted_again = await fetch(server_URL.concat(prefix) + '/' + pipeline.id, {
    //   method: 'DELETE',
    //   headers: headers,
    // });
  }, 30000);
});
