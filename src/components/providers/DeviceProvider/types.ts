import {Insets, OS} from '../../../types';
import {ReactNode, ReactNodeArray} from 'react';

export interface DeviceProviderProps {
  children?: ReactNode | ReactNodeArray;
  defaultOS?: OS;
  insets?: Insets;
  currentInsets?: Insets;
}

export interface DeviceContext {
  /**
   * Device operating system
   */
  os: OS;
  /**
   * Initial device insets. Not changing during application lifetime
   */
  insets: Insets;
  /**
   * Current device insets, changing during application lifetime. For example,
   * when virtual keyboard is being opened
   */
  currentInsets: Insets;
  /**
   * Updates current operating system
   * @param {OS} os
   */
  setOS(os: OS): void;
}
