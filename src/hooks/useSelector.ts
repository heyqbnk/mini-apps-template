import {shallowEqual, useSelector as useReduxSelector} from 'react-redux';
import {ReduxState} from '../redux/types';

/**
 * Shortcut to original useSelector. Useful when you font want to specify
 * shallowEqual every time you use hook
 * @param {(state: ReduxState) => Selected} selector
 * @param {(left: Selected, right: Selected) => boolean} equalityFn
 * @returns {Selected}
 */
export function useSelector<Selected = unknown>(
  selector: (state: ReduxState) => Selected,
  equalityFn: (left: Selected, right: Selected) => boolean = shallowEqual
): Selected {
  return useReduxSelector(selector, equalityFn);
}
