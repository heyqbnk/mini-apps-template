import {StorageField, StorageValueType} from '../types/bridge';
import {useCallback} from 'react';
import useActions from './useActions';
import {storageActions, StorageReducerState} from '../redux/reducers/storage';
import {setStorageValue, dropStorageValues} from '../utils/storage';
import useSelector from './useSelector';

type ModifyStorage<F extends StorageField> =
  (value: StorageValueType<F> | null) => Promise<void>;

/**
 * Позволяет работать с мемоизированным значение bridge storage.
 * @returns {[StorageReducerState[F], ModifyStorage<F>]}
 * @param field
 */
function useStorageValue<F extends StorageField>(
  field: F,
): [StorageReducerState[F], ModifyStorage<F>] {
  const memoize = useActions(storageActions.memoize);
  const value = useSelector(state => state.storage[field]);
  const modify = useCallback<ModifyStorage<F>>(value => {
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
