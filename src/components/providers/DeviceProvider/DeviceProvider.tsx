import React, {memo, useMemo, useState} from 'react';

import {deviceContext} from './context';

import {DeviceContext, DeviceProviderProps} from './types';
import {OS} from '../../../types';

const {Provider} = deviceContext;

export const DeviceProvider = memo(
  function DeviceProvider(props: DeviceProviderProps) {
    const {
      children, currentInsets: parentCurrentInsets, insets: parentInsets,
      defaultOS,
    } = props;
    const [os, setOS] = useState(defaultOS || OS.IOS);

    const insets = useMemo(() => {
      return parentInsets || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
    }, [parentInsets]);

    const currentInsets = useMemo(() => {
      return parentCurrentInsets || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
    }, [parentCurrentInsets]);

    const context = useMemo<DeviceContext>(() => ({
      os,
      insets,
      currentInsets,
      setOS,
    }), [os, insets, currentInsets]);

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  },
);
