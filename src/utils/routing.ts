import {Query, RoutingReducerState} from '../redux/reducers';

/**
 * Prepares query
 * @param {string} search
 * @returns {Query}
 */
export function prepareQuery(search: string): Query {
  return search.split('&').reduce<Query>((acc, elem) => {
    const [key, value] = elem.split('=');
    acc[key] = value;

    return acc;
  }, {});
}

/**
 * Converts query to string
 * @param {Query} query
 * @returns {string}
 */
export function queryToString(query: Query): string {
  return Object
    .keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');
}

/**
 * Prepares routing state
 * @returns {RoutingReducerState}
 * @param url
 */
export function prepareRoutingState(url: string): RoutingReducerState | null {
  const [view, panel, popup = null] = url.split('/');
  const qIndex = url.indexOf('?');
  let query: Query = {};

  // Return null in case view or panel are not defined due to the reason,
  // views cannot exist without panels
  if (!view || !panel) {
    return null;
  }

  // Parse query
  if (qIndex !== -1) {
    query = prepareQuery(url.slice(qIndex + 1));
  }

  return {
    history: [{view, panel, popup}],
    query,
  };
}
