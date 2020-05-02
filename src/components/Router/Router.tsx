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

  const [historyStates, setHistoryStates] = useState(initialHistory || []);
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
  const prevState = useMemo<HistoryState | null>(() => {
    return historyStates[historyStates.length - 2] || null;
  }, [historyStates]);
  const currentState = useMemo<HistoryState>(() => {
    return historyStates[historyStates.length - 1];
  }, [historyStates]);

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

  // Create router context
  const context = useMemo<RouterContext>(() => ({
    history,
    currentState,
    prevState,
    pushState,
    createHref,
  }), [history, createHref, pushState, currentState, prevState]);

  // Listen for history changes to update currentState
  useEffect(() => {
    return history.listen((location, action) => {
      const state = historyStateFromURL(location.hash);

      if (state) {
        setHistoryStates(historyStates => {
          if (action === 'REPLACE') {
            return historyStates.map((historyState, idx, arr) => {
              if (idx === arr.length - 1) {
                return state;
              }
              return historyState;
            });
          }
          if (action === 'PUSH') {
            return [...historyStates, state];
          }
          const prevState = historyStates[historyStates.length - 2];

          // If there was no previous state, it means, arrow "forward" was
          // clicked
          if (!prevState) {
            return [...historyStates, state];
          }
          // Otherwise, check if current state is equal to previous one
          const {query: prevQuery, ...restPrevState} = prevState;
          const {query: stateQuery, ...restState} = state;

          // If current state is equal to previous one, it is usual POP action
          if (
            shallowEqual(prevQuery, stateQuery)
            && shallowEqual(restPrevState, restState)
          ) {
            return historyStates.slice(0, historyStates.length - 1);
          }

          // If it was "unusual" POP action, it means user clicked forward arrow
          return [...historyStates, state];
        });
      }
    });
  }, [history]);

  return <Provider value={context}>{children}</Provider>;
});
