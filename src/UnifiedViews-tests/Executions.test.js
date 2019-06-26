const shit = 'https://cors-anywhere.herokuapp.com/';
const server_URL = 'http://82.202.226.30:8080';
const prefix = '/master/api/1/pipelines/2/executions/';
const prefix_2 = '/master/api/1/pipelines/?userExternalId=admin';
const props = [
  'id',
  'status',
  'orderNumber',
  'start',
  'end',
  'schedule',
  'stop',
  'lastChange',
  'userExternalId',
  'userActorExternalId',
  'debugging',
];

var username = 'master';
var password = 'commander';
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
headers.append('Content-Type', 'application/json');
//headers.append('Accept', 'application/json');

let webData = fetch(shit + server_URL.concat(prefix), {
  method: 'GET',
  headers: headers,
});

let wrongWebData = fetch(shit + server_URL.concat(prefix) + 'WRONG', {
  method: 'GET',
  headers: headers,
});

let pipelines = fetch(shit + server_URL.concat(prefix_2), {
  method: 'GET',
  headers: headers,
});

test('Web request is made correctly', async () => {
  await webData.then((r) => {
    expect(r.status).toEqual(200);
  });
});

test('Web request to a wrong address is caught', async () => {
  await wrongWebData.then((r) => {
    expect(r.status).not.toEqual(200);
  });
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
