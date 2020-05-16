import {Insets, LaunchParams, OS, StorageValuesMap} from '../../../types';
import {
  AppearanceSchemeType,
  AppearanceType,
  UpdateConfigData,
} from '@vkontakte/vk-bridge';
import {Config} from '../../../config';
import {Store} from 'redux';
import {ReduxState} from '../../../redux';
import {HistoryState} from 'vkma-router';
import {AppTree} from '../../../trees';

export type PrepareUpdateStatePayloadProps =
  | 'insets' | 'currentInsets' | 'scheme' | 'appearance' | 'config';
export type PrepareUpdateStatePayloadResult = Partial<Pick<AppRootState,
  PrepareUpdateStatePayloadProps>> | null;

export interface AppRootState {
  loading: boolean;
  error: string | null;
  store: Store<ReduxState>;
  // Config
  config?: UpdateConfigData;
  // Device
  insets?: Insets;
  currentInsets?: Insets;
  // Theme
  appearance?: AppearanceType;
  scheme?: AppearanceSchemeType;
  // VK Storage
  storage?: Partial<StorageValuesMap>;
}

export interface AppRootProps {
  /**
   * Environments-based config
   */
  envConfig: Config;

  /**
   * Device operating system
   */
  os: OS;

  /**
   * Application launch parameters
   */
  launchParams: LaunchParams;

  /**
   * Device insets
   */
  insets?: Insets;

  /**
   * Initial routing state
   */
  history?: HistoryState<AppTree>[];
}

export interface AppRootContext {
  /**
   * Initializes application
   */
  init(): void;
}
