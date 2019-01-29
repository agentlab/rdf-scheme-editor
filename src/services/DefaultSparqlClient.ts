import { SparqlBindingResults, SparqlBooleanResults, SparqlClient, SparqlQueryType } from '@src/types/sparql.d.ts';
import fetch from 'isomorphic-unfetch';

/**
 * Default implementation of SparqlClient.
 */
export default class DefaultSparqlClient implements SparqlClient {

  /**
   * Hold SPARQL base URL.
   */
  private url: string;

  /**
   * Create new instance of client with specified SPARQL base URL.
   * @param url base URL of SPARQL repository
   */
  constructor(url: string) {
    this.url = url;
  }

  /**
   * @inheritdoc
   */
  public async select(query: string): Promise<SparqlBindingResults> {
    this.validateQuery(query, SparqlQueryType.SELECT);
    console.log(query);
    const res = await this.sendQuery(query) as SparqlBindingResults;
    console.log(res);
    return res;
  }

  /**
   * @inheritdoc
   */
  public construct(query: string): Promise<any> {
    this.validateQuery(query, SparqlQueryType.CONSTRUCT);
    return this.sendQuery(query);
  }

  /**
   * @inheritdoc
   */
  public ask(query: string): Promise<SparqlBooleanResults> {
    this.validateQuery(query, SparqlQueryType.ASK);
    return this.sendQuery(query);
  }

  /**
   * @inheritdoc
   */
  public describe(query: string): Promise<any> {
    this.validateQuery(query, SparqlQueryType.DESCRIBE);
    return this.sendQuery(query);
  }

  /**
   * Send query request to SPARQL endpoint.
   *
   * @param query the query
   */
  protected async sendQuery(query: string): Promise<any> {
    // Prepare request
    const fullUrl = this.getFullUrl(query);
    const headers = { headers: this.getHeaders() };
    // Execute query
    const res = await fetch(fullUrl, headers);
    return res.json();
  }

  /**
   * Retrieve default HTTP headers for SPARQL endpoint.
   */
  protected getHeaders(): { [key: string]: string } {
    return {
      Accept: 'application/sparql-results+json'
    };
  }

  /**
   * Retrieve full HTTP URL for SPARQL endpoint requests.
   */
  protected getFullUrl(query: string): string {
    return this.url + '?query=' + encodeURIComponent(query);
  }

  /**
   * Validate input query to be required query.
   *
   * @param query the query to be validated
   * @param type the required type
   */
  private validateQuery(query: string, type: SparqlQueryType): void {
    if (!query.includes(type)) {
      throw new Error(`Query is not ${type}, use another method`);
    }
  }

}
