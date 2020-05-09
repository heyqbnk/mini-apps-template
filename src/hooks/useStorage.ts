import {
  useVkStorage,
  VKStorageContext,
} from '../components/providers/VKStorageProvider';
import {StorageValuesMap} from '../types';

/**
 * Returns application storage
 * @returns {VKStorageContext<StorageValuesMap>}
*/
export const useStorage = () => useVkStorage() as VKStorageContext<StorageValuesMap>;
