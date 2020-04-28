import {memo, useEffect} from 'react';

import {useSelector} from '../../hooks';
import {queryToString} from '../../utils';

export const Router = memo(() => {
  const {historyState, query} = useSelector(state => ({
    historyState: state.routing.history[state.routing.history.length - 1],
    query: state.routing.query,
  }));

  // Each time current history state changes, it is required to update current
  // url
  useEffect(() => {
    if (historyState) {
      const {view, panel, popup} = historyState;
      const queryString = queryToString(query);
      const url = `#${view}/${panel}${popup === null ? '' : `/${popup}`}`
        + (queryString.length > 0 ? `?${queryString}` : '');

      window.history.pushState(null, '', url);
    }
  }, [historyState, query]);

  return null;
});
