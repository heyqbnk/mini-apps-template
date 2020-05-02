import {ReactNode, ReactNodeArray} from 'react';
import {History} from 'history';

export type Query = Record<string, string>;

export interface WithOptionalQuery {
  query?: Query;
}

export interface WithOptionalPopup {
  popup?: string | null;
}

export interface HistoryState {
  view: string;
  panel: string;
  popup: string | null;
  query: Query;
}

export interface HistoryViewState extends WithOptionalQuery, WithOptionalPopup {
  view: string;
  panel: string;
}

interface HistoryPanelState extends WithOptionalQuery, WithOptionalPopup {
  panel: string;
}

interface HistoryPopupState extends WithOptionalQuery {
  popup: string | null;
}

export type HistoryStateType =
  | HistoryViewState
  | HistoryPanelState
  | HistoryPopupState;

export type HistoryType = HistoryState[];

export interface RouterContext {
  /**
   * Routing history
   */
  history: History<HistoryState>;
  /**
   * Current routing history state
   */
  currentState: HistoryState;
  /**
   * Previous routing history state
   */
  prevState: HistoryState | null;
  /**
   * Pushes new state to history
   */
  pushState(historyState: HistoryStateType): void;
  /**
   * Creates href based on history state
   * @param {HistoryStateType} historyState
   * @returns {string}
   */
  createHref(historyState: HistoryStateType): string;
}

export interface RouterProps {
  initialHistory?: HistoryType;
  children: ReactNode | ReactNodeArray;
}
