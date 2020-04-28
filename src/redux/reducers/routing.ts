import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';

export interface RoutingHistoryFullState {
  view: string;
  panel: string;
  popup: string | null;
}

export interface RoutingHistoryViewState {
  view: string;
  panel: string;
  popup?: string | null;
}

interface RoutingHistoryPanelState {
  panel: string;
  popup?: string | null;
}

interface RoutingHistoryPopupState {
  popup: string | null;
}

export type RoutingHistoryStateType =
  | RoutingHistoryViewState
  | RoutingHistoryPanelState
  | RoutingHistoryPopupState;

export type RoutingHistoryType = RoutingHistoryFullState[];

export type Query = Record<string, string>;

export interface RoutingReducerState {
  /**
   * Application history
   */
  history: RoutingHistoryType;
  /**
   * Parsed history's "search" field
   */
  query: Query;
}

export const routingActions = unionize({
  /**
   * Pops last added state from history
   */
  popRouterHistoryState: {},
  /**
   * pushes new state to history
   */
  pushRouterHistoryState: ofType<RoutingHistoryStateType>(),
  /**
   * Sets current query
   */
  setRouterQuery: ofType<Query>(),
}, unionizeConfig);

type RoutingAction = UnionOf<typeof routingActions>;

const initialState: RoutingReducerState = {
  history: [],
  query: {},
};

/**
 * Responsible for application routing
 * @param {RoutingReducerState} state
 * @param {RoutingAction} action
 * @returns {string[]}
 */
export function routingReducer(
  state: RoutingReducerState = initialState,
  action: RoutingAction,
) {
  return routingActions.match(action, {
    popRouterHistoryState: () => {
      // Remove last history state item
      const history = state.history.slice(0, state.history.length - 2);

      // In case, when there are no history items, an exceptional situation
      // appeared. There must always be at least 1 item
      if (history.length === 0) {
        throw new Error(
          'There are no elements in history after calling popHistoryState()',
        );
      }

      return {...state, history};
    },
    pushRouterHistoryState: historyState => {
      const lastElement = state.history[state.history.length - 1];

      return {
        ...state,
        history: [...state.history, {...lastElement, ...historyState}],
      };
    },
    setRouterQuery: query => ({...state, query}),
    default: () => state,
  });
}
