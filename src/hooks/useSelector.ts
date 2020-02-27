import {shallowEqual, useSelector as useReduxSelector} from 'react-redux';
import {IReduxState} from '../redux/types';

/**
 * Шорткат к оригинальному useSelector. Полезно чтобы каждый раз не задавать
 * тип хранилища.
 * @param {(state: IReduxState) => TSelected} selector
 * @param {(left: TSelected, right: TSelected) => boolean} equalityFn
 * @returns {TSelected}
 */
function useSelector<TSelected = unknown>(
  selector: (state: IReduxState) => TSelected,
  equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual
): TSelected {
  return useReduxSelector(selector, equalityFn);
}

export default useSelector;
