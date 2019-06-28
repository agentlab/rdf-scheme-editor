const shit = 'https://cors-anywhere.herokuapp.com/';
const server_URL = 'http://82.202.226.30:8080';
const get_pipelines = '/master/api/1/pipelines/visible?userExternalId=admin';
const post_pipelines = '/master/api/1/pipelines/';
const props = ['id', 'name', 'description', 'userExternalId', 'userActorExternalId'];

var username = 'master';
var password = 'commander';
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

let webData = fetch(shit + server_URL.concat(get_pipelines), {
  method: 'GET',
  headers: headers,
});

test('Web request is made correctly', async () => {
  await webData.then((r) => {
    expect(r.status).toEqual(200);
  });
});

let wrongWebData = fetch(shit + 'WRONG' + server_URL.concat(get_pipelines) + 'WRONG', {
  method: 'GET',
  headers: headers,
});

test('Web request to a wrong address is caught', async () => {
  await wrongWebData.then((r) => {
    expect(r.status).not.toEqual(200);
  });
});

let pipelines = fetch(shit + server_URL.concat(get_pipelines), {
  method: 'GET',
  headers: headers,
});

test('The repositories information is correct', async () => {
  const data = await pipelines.then((r) => r.json());
  console.log(data);
  data.forEach((dataElement) => {
    props.forEach((property) => {
      expect(dataElement).toHaveProperty(property);
    });
  });
});

test('create pipeline', async () => {
  const dataPost = await fetch(shit + server_URL.concat(post_pipelines), {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: 'lostmap' + Math.floor(Date.now() / 1000),
      description: 'once again',
      userExternalId: 'admin',
    }),
  }).then((r) => r.json());
  console.log(dataPost);

  //Get new pipelines
  const dataGet = await fetch(shit + server_URL.concat(get_pipelines), {
    method: 'GET',
    headers: headers,
  }).then((r) => r.json());

  const newPipelines = dataGet.map((binding) => ({
    id: binding.id.value,
    name: binding.name.value,
    description: binding.description.value,
  }));

  //Check if created pipeline really was created
  expect(newPipelines).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: dataPost.id.value,
        name: dataPost.name.value,
        description: dataPost.description.value,
      }),
    ]),
  );
});
