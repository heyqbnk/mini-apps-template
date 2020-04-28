import {RoutingHistoryFullState} from '../redux/reducers';
import {useSelector} from './useSelector';

/**
 * Returns current history state
 * @returns {RoutingHistoryFullState}
 */
export function useHistoryState(): RoutingHistoryFullState {
  return useSelector(state => {
    return state.routing.history[state.routing.history.length - 1];
  });
}
