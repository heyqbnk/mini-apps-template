import {EStorageField, TStorageValueType} from '../types/bridge';
import {useCallback} from 'react';
import useActions from './useActions';
import {
  storageActions,
  TStorageReducerState,
} from '../redux/reducers/bridge-storage';
import {setStorageValue, dropStorageValues} from '../utils/bridge';
import useSelector from './useSelector';

type TModifyStorage<F extends EStorageField> =
  (value: TStorageValueType<F> | null) => void;

const useReduxValue = <F extends EStorageField>(
  field: F,
) => useSelector(state => state.storage[field]);

/**
 * Позволяет работать с мемоизированным значение bridge storage.
 * @returns {[TStorageReducerState[F], TModifyStorage<F>]}
 * @param field
 */
function useStorageValue<F extends EStorageField>(
  field: F,
): [TStorageReducerState[F], TModifyStorage<F>] {
  const memoize = useActions(storageActions.memoize);
  const value = useReduxValue(field);
  const modify = useCallback<TModifyStorage<F>>(value => {
    memoize({[field]: value});

    // Если задали null, это означает что свойство хотят дропнуть.
    if (value === null) {
      return dropStorageValues(field);
    }
    return setStorageValue(field, value);
  }, [field, memoize]);

  return [value, modify];
}

export default useStorageValue;
