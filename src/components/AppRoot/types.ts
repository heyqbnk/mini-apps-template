import {StorageValuesMap} from '../../types';
import {NonIndexedHistory} from 'vkma-router';
import {ThemeType} from 'vkma-ui';
import {AppTree} from '../../trees';

export interface AppRootState {
  loading: boolean;
  error?: string;
  history?: NonIndexedHistory<AppTree>;
  storage?: Partial<StorageValuesMap>;
  theme: ThemeType;
}

export interface AppRootContext {
  /**
   * Initializes application
   */
  init(): void;
}
