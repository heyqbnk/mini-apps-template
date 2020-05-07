import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {routerContext} from './context';
import {createBrowserHistory} from 'history';
import {historyStateFromURL, historyStateToURL, shallowEqual} from './utils';

import {
  AnyHistoryState,
  AnyHistoryStateType,
  RouterContext,
  RouterProps,
} from './types';

const {Provider} = routerContext;

export const Router = memo((props: RouterProps) => {
  const {children, initialHistory, viewsTree} = props;

  const [historyStates, setHistoryStates] = useState(initialHistory || []);
  const initialHistoryRef = useRef(initialHistory);
  const history = useMemo(() => {
    const initialHistory = initialHistoryRef.current;
    const h = createBrowserHistory<AnyHistoryState>();

    // If initial history was passed, add all states to history
    if (initialHistory) {
      initialHistory.forEach(state => h.push(historyStateToURL(state), state));
    }
    // Otherwise pass current location
    else {
      const url = window.location.hash;
      const state = historyStateFromURL(url, viewsTree);

      if (state) {
        h.push(url, state);
      }
    }
    return h;
  }, [viewsTree]);
  const prevState = useMemo<AnyHistoryState | null>(() => {
    return historyStates[historyStates.length - 2] || null;
  }, [historyStates]);
  const currentState = useMemo(() => {
    return historyStates[historyStates.length - 1];
  }, [historyStates]);

  // Pushes state to history
  const pushState = useCallback((historyState: AnyHistoryStateType) => {
    const state = {...history.location.state, ...historyState};
    const url = historyStateToURL(state);
    history.push(url, state);
  }, [history]);

  // Creates url
  const createHref = useCallback((historyState: AnyHistoryStateType) => {
    const state = {...history.location.state, ...historyState};
    const url = historyStateToURL(state);
    return history.createHref({hash: url, state}).slice(1);
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
      const state = historyStateFromURL(location.hash, viewsTree);

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
  }, [history, viewsTree]);

  return <Provider value={context}>{children}</Provider>;
});
