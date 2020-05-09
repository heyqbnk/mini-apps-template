import {UpdateConfigData} from '@vkontakte/vk-bridge';
import {PreparedDefaultAppConfig, PreparedMVKAppConfig} from './types';

/**
 * Converts UpdateConfigData snake case fields to camel case
 * @param {UpdateConfigData} config
 * @returns {PreparedMVKAppConfig | PreparedDefaultAppConfig}
 */
export function prepareAppConfig(
  config: Partial<UpdateConfigData>,
): Partial<PreparedMVKAppConfig> | Partial<PreparedDefaultAppConfig> {
  if ('insets' in config) {
    const {app_id, start_time, ...restConfig} = config;

    return {
      ...restConfig,
      appId: app_id,
      startTime: start_time,
    };
  }
  if ('viewport_height' in config && 'viewport_width' in config) {
    const {viewport_height, viewport_width, ...restConfig} = config;

    return {
      ...restConfig,
      viewportHeight: viewport_height,
      viewportWidth: viewport_width,
    };
  }
  return config;
}
