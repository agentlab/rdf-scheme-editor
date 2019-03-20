export function executeGet(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/sparql-results+json'
    }
  }).then(r => r.json());
}

export function executeSelect(url, query) {
  return fetch(url + '?query=' + encodeURIComponent(query) + '&queryLn=sparql', {
    method: 'GET',
    headers: {
      'Accept': 'application/sparql-results+json'
    }
  }).then(r => r.json());
}

export function executeUpdate(url, query) {
  console.log(`update=${encodeURIComponent(query)}`);
  return fetch(url + '/statements', {
    method: 'POST',
    headers: {
      'Accept': 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `update=${encodeURIComponent(query)}`
  }).then(r => { console.log(r); return r; });
}
