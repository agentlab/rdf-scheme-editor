// Type definitions for SPARQL module
// Project: https://agentlab.ru/gitlab/semantic/graph/

/**
 * Client for executing SPARQL queries on SPARQL enpoint.
 *
 * @see https://www.w3.org/TR/rdf-sparql-query
 */
export interface SparqlClient {

  /**
   * Execute specified `SELECT` SPARQL query on SPARQL endpoint.
   *
   * Returns all, or a subset of, the variables bound in a query pattern match.
   *
   * @param query `SELECT` SPARQL query
   * @returns Promise of SparqlBindingResults
   * @see https://www.w3.org/TR/rdf-sparql-query/#select
   */
  select(query: string): Promise<SparqlBindingResults>;

  /**
   * Execute specified `CONSTRUCT` SPARQL query on SPARQL endpoint.
   *
   * The CONSTRUCT query form returns a single RDF graph specified by a graph template.
   * The result is an RDF graph formed by taking each query solution in the solution
   * sequence, substituting for the variables in the graph template, and combining the
   * triples into a single RDF graph by set union.
   *
   * If any such instantiation produces a triple containing an unbound variable or an illegal
   * RDF construct, such as a literal in subject or predicate position, then that triple is
   * not included in the output RDF graph. The graph template can contain triples with no
   * variables (known as ground or explicit triples), and these also appear in the output
   * RDF graph returned by the CONSTRUCT query form.
   *
   * @param query `CONSTRUCT` SPARQL query
   * @see https://www.w3.org/TR/rdf-sparql-query/#construct
   */
  construct(query: string): Promise<any>; // TODO: specify return type

  /**
   * Execute specified `ASK` SPARQL query on SPARQL endpoint.
   *
   * Applications can use the `ASK` form to test whether or not a query pattern has a solution.
   * No information is returned about the possible query solutions, just whether or not a
   * solution exists.
   *
   * @param query `ASK` SPARQL query
   * @returns Promise of SparqlBooleanResults
   * @see https://www.w3.org/TR/rdf-sparql-query/#ask
   */
  ask(query: string): Promise<SparqlBooleanResults>;

  /**
   * Execute specified `DESCRIBE` SPARQL query on SPARQL endpoint.
   *
   * The `DESCRIBE` form returns a single result RDF graph containing RDF data about resources.
   * This data is not prescribed by a SPARQL query, where the query client would need to know
   * the structure of the RDF in the data source, but, instead, is determined by the SPARQL
   * query processor. The query pattern is used to create a result set. The `DESCRIBE` form
   * takes each of the resources identified in a solution, together with any resources
   * directly named by IRI, and assembles a single RDF graph by taking a "description"
   * which can come from any information available including the target RDF Dataset.
   * The description is determined by the query service. The syntax `DESCRIBE *` is an
   * abbreviation that describes all of the variables in a query.
   *
   * @param query `DESCRIBE` SPARQL query
   * @see https://www.w3.org/TR/rdf-sparql-query/#describe
   */
  describe(query: string): Promise<any>; // TODO: specify return type

}

export enum SparqlQueryType {
  ASK = 'ASK',
  CONSTRUCT = 'CONSTRUCT',
  SELECT = 'SELECT',
  DESCRIBE = 'DESCRIBE'
}

/**
 * Represent URI RDF term.
 */
export interface SparqlUriTerm {

  /**
   * The type of the term.
   */
  type: 'uri';

  /**
   * The value of the uri.
   */
  value: string;

}

/**
 * Represent literal RDF term.
 */
export interface SparqlLiteralTerm {

  /**
   * The type of the term.
   */
  type: 'literal';

  /**
   * The value of the literal.
   */
  value: string;

  /**
   * The datatype of the literal.
   */
  datatype?: string;

  /**
   * The lang tag of the literal.
   */
  'xml:lang'?: string;

}

/**
 * Represent blank node RDF term.
 *
 * The blank node label is scoped to the results object. That is, two blank nodes with the same
 * label in a single SPARQL Results JSON object are the same blank node. This is not an indication
 * of any internal system identifier the SPARQL processor may use. Use of the same label in another
 * SPARQL Results JSON object does not imply it is the same blank node.
 */
export interface SparqlBlankNodeTerm {

  /**
   * The type of the term.
   */
  type: 'bnode';

  /**
   * The value of the blank node.
   */
  value: string;

}

export type SparqlTerm = SparqlUriTerm | SparqlLiteralTerm | SparqlBlankNodeTerm;

/**
 * Represent single binding.
 */
export interface SparqlBinding {
  [key: string]: SparqlTerm;
}

/**
 * The results of a SPARQL `SELECT` query are serialized as an array of bindings of variables.
 * The value of the `head` key is an array of all variables projected in the query's `SELECT` clause.
 *
 * @see https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/#select-results-form
 */
export interface SparqlBindingResults {

  /**
   * The `head` member gives the variables mentioned in the results and may contain a
   * `link` member.
   */
  head: {

    /**
     * The `vars` member is an array giving the names of the variables used in the results.
     * These are the projected variables from the query. A variable is not necessarily given
     * a value in every query solution of the results.
     *
     * The order of variable names should correspond to the variables in the `SELECT` clause
     * of the query, unless the query is of the form `SELECT *` in which case order is not significant.
     */
    vars: string[];

    /**
     * The optional `link` member gives an array of URIs, as strings, to refer for further
     * information. The format and content of these `link` references is not defined.
     */
    link?: string[];

  };

  /**
   * The value of the `results` member is an object with a single key, `bindings`.
   */
  results: {

    /**
     * The value of the `bindings` member is an array with zero or more elements, one element
     * per query solution. Each query solution is a JSON object. Each key of this object is a
     * variable name from the query solution. The value for a given variable name is a JSON object
     * that encodes the variable's bound value, an RDF term. There are zero elements in the array
     * if the query returned an empty solution sequence. Variables names do not include the initial
     * "?" or "$" character. Each variable name that appears as a key within the `bindings` array
     * will have appeared in the `vars` array in the results header.
     *
     * A variable does not appear in an array element if it is not bound in that particular query
     * solution.
     *
     * The order of elements in the bindings array reflects the order, if any, of the query solution
     * sequence.
     *
     * If the query returns no solutions, an empty array is used.
     */
    bindings: SparqlBinding[];

  };

}

/**
 * The results of a SPARQL ASK query are serialized as a boolean value, giving the result of the
 * query evaluation.
 *
 * @see https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/#ask-result-form
 */
export interface SparqlBooleanResults {

  /**
   * The `head` member gives the variables mentioned in the results and may contain a
   * `link` member.
   */
  head: {

    /**
     * The optional `link` member gives an array of URIs, as strings, to refer for further
     * information. The format and content of these `link` references is not defined.
     */
    link?: string[];

  };

  /**
   * The result of an `ASK` query form are encoded by the `boolean` member, which takes either the JSON
   * value true or the JSON value false.
   */
  boolean: boolean;

}

/**
 * The results of a SPARQL Query are serialized in JSON as a single top-level JSON object.
 * This object has a `head` member and either a `results` member or a `boolean` member,
 * depending on the query form.
 */
export type SparqlResults = SparqlBindingResults | SparqlBooleanResults;
