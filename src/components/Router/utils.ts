import {HistoryState, Query} from './types';

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
 * Parses url and returns history state and query
 * @returns {[(HistoryState | null), Query]}
 * @param rawUrl
 */
export function historyStateFromURL(
  rawUrl: string,
): HistoryState | null {
  const qIndex = rawUrl.indexOf('?');
  const hIndex = rawUrl.indexOf('#');
  const url = rawUrl.slice(hIndex + 1, qIndex === -1 ? rawUrl.length : qIndex);
  const [view, panel, popup = null] = url.split('/');
  const search = qIndex === -1 ? null : rawUrl.slice(qIndex + 1);

  return view && panel ? {
    view,
    panel,
    popup,
    query: search ? prepareQuery(search) : {},
  } : null;
}

/**
 * Converts history state to string
 * @param {HistoryState} state
 * @returns {string}
 */
export function historyStateToURL(state: HistoryState): string {
  const {view, panel, popup, query} = state;
  const queryKeys = Object.keys(query);
  const stringifiedQuery = queryKeys.length === 0
    ? null
    : queryKeys
      .map(key => `${key}=${query[key]}`)
      .join('&');

  return `#${view}/${panel}${popup === null ? '' : `/${popup}`}`
    + (stringifiedQuery === null ? '' : `?${stringifiedQuery}`);
}

export function shallowEqual<L extends Record<string, any>,
  R extends Record<string, any>>(
  left: L,
  right: R,
): boolean {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  return leftKeys.every(k => {
    return rightKeys.includes(k) && left[k] === right[k];
  });
}
