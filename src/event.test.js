const crossAny = 'https://cors-anywhere.herokuapp.com/';
const server_URL = 'http://82.202.226.30:8080';
const prefix = '/master/api/1/pipelines/1/executions/1/events';

var username = 'master';
var password = 'commander';
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

test('Events test', async () => {
  const data = await fetch(crossAny + server_URL.concat(prefix), {
    method: 'GET',
    headers: headers,
  }).then((r) => r.json());

  console.log(data);
});
