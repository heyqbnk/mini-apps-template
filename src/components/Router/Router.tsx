import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

import {routerContext} from './context';
import {createBrowserHistory, History} from 'history';
import {historyStateFromURL, historyStateToURL, shallowEqual} from './utils';

import {
  HistoryState,
  HistoryStateType,
  RouterContext,
  RouterProps,
} from './types';

const {Provider} = routerContext;

export const Router = memo((props: RouterProps) => {
  const {children, initialHistory} = props;

  // Create history
  const history = useMemo<History<HistoryState>>(() => {
    const h = createBrowserHistory<HistoryState>();

    // If initial history was passed, add all states to history
    if (initialHistory) {
      initialHistory.forEach(state => {
        h.push(historyStateToURL(state), state);
      });
    }
    // Otherwise pass current location
    else {
      const url = window.location.hash;
      const state = historyStateFromURL(url);

      if (state) {
        h.push(url, state);
      }
    }
    return h;
    // eslint-disable-next-line
  }, []);

  // Current routing state
  const [currentState, setCurrentState] = useState<HistoryState>(
    () => history.location.state,
  );

  // Pushes state to history
  const pushState = useCallback((historyState: HistoryStateType) => {
    const state = {...history.location.state, ...historyState};
    const url = historyStateToURL(state);
    history.push(url, state);
  }, [history]);

  // Creates url
  const createHref = useCallback((historyState: HistoryStateType) => {
    const state = {...history.location.state, ...historyState};
    const url = historyStateToURL(state);
    return history.createHref({hash: url, state});
  }, [history]);

  const context = useMemo<RouterContext>(() => ({
    history,
    currentState,
    pushState,
    createHref,
  }), [history, createHref, pushState, currentState]);

  if (history.length === 0) {
    throw new Error(
      'Router history became empty for some reason. It is not allowed ' +
      'because it becomes unknown to determine where currently application is',
    );
  }

  // Listen for history changes to update currentState
  useEffect(() => {
    return history.listen(location => {
      const state = historyStateFromURL(location.hash);

      if (state) {
        setCurrentState(
          currentState => {
            const {query: currentQuery, ...restCurrentState} = currentState;
            const {query: stateQuery, ...restState} = state;

            return shallowEqual(restCurrentState, restState)
            && shallowEqual(currentQuery, stateQuery)
              ? currentState
              : state;
          },
        );
      }
    });
  }, [history]);

  return <Provider value={context}>{children}</Provider>;
});
