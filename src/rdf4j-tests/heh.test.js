import { executeGet } from "../sparql";

const url = "https://agentlab.ru/rdf4j-workbench/repositories/reqs/namespaces";
const expected_data = [
  { key: "http://www.w3.org/2005/xpath-functions#", prefix: "fn" },
  { key: "http://spinrdf.org/sp#", prefix: "sp" },
  { key: "http://spinrdf.org/spl#", prefix: "spl" },
  { key: "http://purl.org/dc/terms/", prefix: "dcterms" },
  { key: "http://purl.org/vocab/vann/", prefix: "vann" },
  { key: "http://www.w3.org/2003/06/sw-vocab-status/ns#", prefix: "vs" },
  { key: "http://open-services.net/ns/core#", prefix: "oslc" },
  { key: "http://open-services.net/ns/rm#", prefix: "oslc_rm" },
  { key: "http://spinrdf.org/spif#", prefix: "spif" },
  { key: "http://purl.org/dc/elements/1.1/", prefix: "dc11" },
  { key: "http://purl.org/dc/terms/", prefix: "dc" },
  { key: "http://jazz.net/ns/rm#", prefix: "jazz_rm" },
  { key: "ftufgi", prefix: "tutu" },
  { key: "http://www.w3.org/1999/02/22-rdf-syntax-ns#", prefix: "rdf" },
  { key: "http://www.w3.org/2000/01/rdf-schema#", prefix: "rdfs" },
  { key: "http://www.w3.org/2005/xpath-functions#", prefix: "fn2" },
  { key: "http://www.w3.org/2002/07/owl#", prefix: "yest" },
  { key: "http://spinrdf.org/spin#", prefix: "spin" },
  { key: "https://agentlab.ru/ns/rm#", prefix: "al_rm" },
  { key: "http://www.ibm.com/xmlns/rdm/rdf/", prefix: "rm" },
  { key: "http://jena.hpl.hp.com/ARQ/function#", prefix: "afn" },
  { key: "http://www.w3.org/2002/07/owl#", prefix: "owl" },
  { key: "s", prefix: "s" },
  { key: "http://spinrdf.org/arg#", prefix: "arg" },
  { key: "http://www.w3.org/2001/XMLSchema#", prefix: "xsd" },
  {
    key: "https://agentlab.ru/expert/rm/expert/reqs-collection#",
    prefix: "reqs-collection"
  },
  { key: "http://www.openrdf.org/schema/sesame#", prefix: "sesame" },
  { key: "http://schema.org/", prefix: "schema" },
  {
    key: "https://agentlab.ru/rdf4j-server/repositories/reqs/users#",
    prefix: ""
  },
  { key: "http://www.w3.org/2001/XMLSchema#", prefix: "xmlschema" },
  { key: "http://xmlns.com/foaf/0.1/", prefix: "foaf" },
  { key: "http://com.ibm.rdm/navigation#", prefix: "nav" },
  {
    key: "https://agentlab.ru/rdf4j-server/repositories/reqs/users#",
    prefix: "users"
  },
  {
    key: "https://agentlab.ru/rdf4j-server/repositories/reqs/projects#",
    prefix: "projects"
  },
  {
    key: "https://agentlab.ru/rdf4j-server/repositories/reqs/folders#",
    prefix: "folders"
  },
  { key: "http://www.ibm.com/xmlns/rdm/types/", prefix: "rmTypes" },
  {
    key: "https://agentlab.ru/expert/rm/expert/reqs-collection#",
    prefix: "reqs_collection"
  },
  { key: "http://cpgu.kbpm.ru/ns/rm/user-types#", prefix: "rmUserTypes" },
  { key: "http://www.w3.org/ns/shacl#", prefix: "sh" },
  { key: "http://cpgu.kbpm.ru/ns/rm/cpgu#", prefix: "cpgu" },
  { key: "http://open-services.net/ns/asset#", prefix: "oslc_asset" }
];

const element = {
  key: "http://jazz.net/ns/rm#",
  prefix: "jazz_rm"
};

test("rdf4j_request_namespaces", () => {
  // expect.assertions(1);
  return executeGet(url)
    .then(
      res =>
        res.results.bindings.map(binding => ({
          prefix: binding.prefix.value,
          key: binding.namespace.value
        })),
      error => {
        console.error(error);
      }
    )
    .then(data => {
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(41);
      expect(data).toContainEqual(element);
      expect(data).toEqual(expected_data);
    });
});
