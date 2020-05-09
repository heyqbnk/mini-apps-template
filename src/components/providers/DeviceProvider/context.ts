import {createContext, useContext} from 'react';
import {DeviceContext} from './types';
import {OS} from '../../../types';

const noop = () => {};

export const deviceContext = createContext<DeviceContext>({
  os: OS.IOS,
  insets: {top: 0, bottom: 0, left: 0, right: 0},
  currentInsets: {top: 0, bottom: 0, left: 0, right: 0},
  setOS: noop,
});

export const useDevice = () => useContext(deviceContext);
