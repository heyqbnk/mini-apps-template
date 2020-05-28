import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

import {vkStorageContext} from './context';

import {
  MemoizeKey,
  MemoizeMap,
  ClearAll,
  ClearKeys,
  VKStorageContext,
  VKStorageProviderProps,
} from './types';

import vkBridge from '@vkontakte/vk-bridge';
import {StringKeys} from '../../types';

const {Provider} = vkStorageContext;

export const VKStorageProvider = memo(
  function VKStorageProvider<S extends {} = {}>(props: VKStorageProviderProps<S>) {
    const {storage: parentStorage, children} = props;

    const [storage, setStorage] = useState<S>(() => {
      return parentStorage || {} as S;
    });

    // Updates storage value with bridge
    const setVKStorageValue = useCallback(
      <K extends StringKeys<S>>(key: K, value: S[K] | null) => {
        return vkBridge.send('VKWebAppStorageSet', {
          key,
          // encodeURIComponent is a hack for russian letters. They are
          // incorrectly written in Redis VK storage
          value: encodeURIComponent(JSON.stringify(value)),
        });
      },
      [],
    );

    // Memoizes value
    const memoizeKey = useCallback<MemoizeKey<S>>(async (key, value) => {
      await setVKStorageValue(key, value);

      // Update storage
      setStorage(storage => {
        if (value === null) {
          if (key in storage) {
            delete storage[key];
            return {...storage};
          }
          return storage;
        }
        return {...storage, [key]: value};
      });
    }, [setVKStorageValue]);

    // Memoizes set of values
    const memoizeMap = useCallback<MemoizeMap<S>>(async values => {
      await Promise.all(
        Object.entries(values).map(([key, value]) => {
          return setVKStorageValue(key as any, value);
        }),
      );

      // Update storage
      setStorage(storage => {
        let isStorageModified = false;
        const copy = {...storage};

        Object.entries(values).forEach(([key, value]) => {
          if (value === null) {
            if (key in copy) {
              delete copy[key as keyof typeof copy];
              isStorageModified = true;
            }
          } else {
            copy[key as keyof typeof copy] = value as any;
            isStorageModified = true;
          }
        });

        return isStorageModified ? copy : storage;
      });
    }, [setVKStorageValue]);

    // Unified memoize method
    const memoize = useCallback<MemoizeKey<S> | MemoizeMap<S>>(
      (arg0, value) => {
        if (typeof arg0 === 'object') {
          return memoizeMap(arg0);
        }
        return memoizeKey(arg0, value);
      },
      [memoizeKey, memoizeMap],
    );

    // Clears several keys
    const clearKeys = useCallback<ClearKeys<S>>(async (...keys) => {
      await Promise.all(
        keys.map(k => setVKStorageValue(k, null)),
      );

      // Update storage
      setStorage(storage => {
        let isStorageModified = false;
        const copy = {...storage};

        keys.forEach(key => {
          if (key in copy) {
            delete copy[key as keyof typeof copy];
            isStorageModified = true;
          }
        });

        return isStorageModified ? copy : storage;
      });
    }, [setVKStorageValue]);

    // Clears all storage keys
    const clearAll = useCallback(async () => {
      return clearKeys(...Object.keys(storage) as any);
    }, [storage, clearKeys]);

    const clear = useCallback<ClearKeys<S> | ClearAll>(keys => {
      if (typeof keys === 'undefined') {
        return clearAll();
      }
      return clearKeys(...(Array.isArray(keys) ? keys : [keys]));
    }, [clearKeys, clearAll]);

    const context = useMemo<VKStorageContext<S>>(() => ({
      storage,
      memoize,
      clear,
    }), [storage, memoize, clear]);

    // Each time new parent storage passed, update internal storage
    useEffect(() => {
      if (parentStorage) {
        return setStorage(parentStorage);
      }
    }, [parentStorage]);

    return <Provider value={context}>{children}</Provider>;
  },
);
