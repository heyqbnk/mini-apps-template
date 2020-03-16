import {useCallback} from 'react';
import useActions from './useActions';
import {storageActions, StorageReducerState} from '../redux/reducers/storage';
import {dropStorage} from '../utils/storage';
import useSelector from './useSelector';

type DropStorage = () => Promise<void>;

/**
 * Позволяет работать с мемоизированными значениями bridge storage
 * @returns {[StorageReducerState, DropStorage]}
 */
function useStorage(): [StorageReducerState, DropStorage] {
  const dropAllValues = useActions(storageActions.dropAllValues);
  const storage = useSelector(state => state.storage);
  const drop = useCallback<DropStorage>(async () => {
    await dropStorage();
    dropAllValues();
  }, [dropAllValues]);

  return [storage, drop];
}

export default useStorage;
