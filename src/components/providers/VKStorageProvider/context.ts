import {createContext, useContext} from 'react';
import {VKStorageContext} from './types';

const noop = async () => {
};

export const vkStorageContext = createContext<VKStorageContext<any>>({
  storage: {},
  memoize: noop,
  clear: noop,
});

export const useVkStorage = () => useContext(vkStorageContext);
