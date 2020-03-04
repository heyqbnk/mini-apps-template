import {shallowEqual, useSelector as useReduxSelector} from 'react-redux';
import {ReduxState} from '../redux/types';

/**
 * Шорткат к оригинальному useSelector. Полезно чтобы каждый раз не задавать
 * тип хранилища.
 * @param {(state: ReduxState) => Selected} selector
 * @param {(left: Selected, right: Selected) => boolean} equalityFn
 * @returns {Selected}
 */
function useSelector<Selected = unknown>(
  selector: (state: ReduxState) => Selected,
  equalityFn: (left: Selected, right: Selected) => boolean = shallowEqual
): Selected {
  return useReduxSelector(selector, equalityFn);
}

export default useSelector;
