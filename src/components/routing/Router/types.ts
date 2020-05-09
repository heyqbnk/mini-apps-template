import {ReactNode, ReactNodeArray} from 'react';
import {History} from 'history';
import {GetRoutes, Query, ViewsTree} from '../../../types';

interface WithOptionalQuery {
  query?: Query;
}

interface WithOptionalPopup<ID> {
  popup?: ID | null;
}

interface WithPopup<ID> {
  popup: ID | null;
}

/**
 * Full history item state
 */
export type HistoryState<T extends ViewsTree<any, any, any>> =
  T extends ViewsTree<any, any, infer PopupId>
    ? GetRoutes<T> & WithPopup<PopupId> & { query: Query }
    : never;

/**
 * History update state with view, panel, query and popup
 */
type HistoryViewState<T extends ViewsTree<any, any, any>> =
  T extends ViewsTree<any, any, infer PopupId>
    ? GetRoutes<T> & WithOptionalQuery & WithOptionalPopup<PopupId>
    : never;

/**
 * History update state with panel, query and popup
 */
type HistoryPanelState<PanelId, PopupId> =
  { panel: PanelId } & WithOptionalQuery & WithOptionalPopup<PopupId>;

/**
 * History update state with popup and query
 */
type HistoryPopupState<PopupId> = WithPopup<PopupId> & WithOptionalQuery;

/**
 * Type of state which can be used to update current history
 */
export type HistoryStateType<T extends ViewsTree<any, any, any>> =
  T extends ViewsTree<any, infer PanelId, infer PopupId>
    ? (
    | HistoryViewState<T>
    | HistoryPanelState<PanelId, PopupId>
    | HistoryPopupState<PopupId>
      )
    : never;

/**
 * Type of history
 */
export type HistoryType<T extends ViewsTree<any, any, any>> = HistoryState<T>[];

export type AnyViewsTree = ViewsTree<any, any, any>;
export type AnyHistoryType = HistoryType<AnyViewsTree>;
export type AnyHistoryState = HistoryState<AnyViewsTree>;
export type AnyHistoryStateType = HistoryStateType<AnyViewsTree>;

export interface RouterContext {
  /**
   * Routing history
   */
  history: History<AnyHistoryState>;
  /**
   * Current routing history state
   */
  currentState: AnyHistoryState;
  /**
   * Previous routing history state
   */
  prevState: AnyHistoryState | null;
  /**
   * Pushes new state to history
   */
  pushState(historyState: AnyHistoryStateType): void;
  /**
   * Creates href based on history state
   * @param {HistoryStateType} historyState
   * @returns {string}
   */
  createHref(historyState: AnyHistoryStateType): string;
}

export interface RouterProps {
  initialHistory?: AnyHistoryType;
  children: ReactNode | ReactNodeArray;
  viewsTree: AnyViewsTree;
}
