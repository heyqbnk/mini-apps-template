import {IDType, ViewsTree, Query, GetRoutes, TreeView} from '../../types';
import {AnyViewsTree, HistoryState} from './types';

/**
 * Converts search string to query object
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
 * @param url
 * @param tree
 */
export function historyStateFromURL(
  url: string,
  tree: AnyViewsTree,
): HistoryState<AnyViewsTree> | null {
  const qIndex = url.indexOf('?');
  const hIndex = url.indexOf('#');
  const _url = url.slice(hIndex + 1, qIndex === -1 ? url.length : qIndex);
  const [view, panel, popup = null] = _url.split('/');
  const search = qIndex === -1 ? null : url.slice(qIndex + 1);

  if (!view || !panel || !tree[view]?.panels[panel]) {
    return null;
  }

  return {
    view,
    panel,
    popup,
    query: search ? prepareQuery(search) : {},
  };
}

/**
 * Converts history state to string
 * @param {HistoryState} state
 * @returns {string}
 */
export function historyStateToURL(state: HistoryState<AnyViewsTree>): string {
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

/**
 * Returns available routes for tree
 * @param {T} tree
 * @returns {GetRoutes<T>[]}
 */
export function getRoutes<T extends ViewsTree<ViewId, PanelId, PopupId>,
  ViewId extends IDType,
  PanelId extends IDType,
  PopupId extends IDType>(tree: T): GetRoutes<T>[] {
  return Object.keys(tree).reduce<GetRoutes<T>[]>((acc, view) => {
    const {panels} = tree[view as keyof T] as TreeView<PanelId>;

    // TODO: Popups support
    Object.keys(panels).forEach(panel => acc.push({
      view: view,
      panel: panel,
    } as any));

    return acc;
  }, []);
}

/**
 * Shallowly compares 2 objects
 * @param {L} left
 * @param {R} right
 * @returns {boolean}
 */
export function shallowEqual<L extends Record<any, any>,
  R extends Record<any, any>>(left: L, right: R): boolean {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  return leftKeys.every(k => {
    return rightKeys.includes(k) && left[k] === right[k];
  });
}
