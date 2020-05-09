import {Insets, LaunchParams, OS, StorageValuesMap} from '../../../types';
import {
  AppearanceSchemeType,
  AppearanceType,
  UpdateConfigData,
} from '@vkontakte/vk-bridge';
import {Config} from '../../../config';
import {HistoryType} from '../../routing/Router';
import {AppViewsTree} from '../../../viewsTree';
import {Store} from 'redux';
import {ReduxState} from '../../../redux';

export type PrepareUpdateStatePayloadProps =
  | 'insets' | 'currentInsets' | 'scheme' | 'appearance' | 'config';
export type PrepareUpdateStatePayloadResult = Partial<Pick<AppRootState,
  PrepareUpdateStatePayloadProps>> | null;

export interface AppRootState {
  loading: boolean;
  error: string | null;
  store: Store<ReduxState>;
  // Config
  config: UpdateConfigData | null;
  // Device
  insets: Insets | null;
  currentInsets: Insets | null;
  // Theme
  appearance: AppearanceType | null;
  scheme: AppearanceSchemeType | null;
  // VK Storage
  storage: Partial<StorageValuesMap> | null;
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
  history?: HistoryType<AppViewsTree>;
}
