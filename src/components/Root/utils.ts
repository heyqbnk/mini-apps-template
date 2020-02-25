import {
  ReceiveMethodName,
  VKConnectEvent,
  VKConnectSuccessEvent,
} from '@vkontakte/vk-connect';

/**
 * Claims if event is VKWebAppUpdateConfig.
 * @param event
 */
export function isUpdateConfigEvent(
  event: VKConnectEvent<ReceiveMethodName>,
): event is VKConnectSuccessEvent<'VKWebAppUpdateConfig'> {
  return event.detail && event.detail.type === 'VKWebAppUpdateConfig';
}

/**
 * Claims if event is VKWebAppUpdateInsets.
 * @param event
 */
export function isUpdateInsetsEvent(
  event: VKConnectEvent<ReceiveMethodName>,
): event is VKConnectSuccessEvent<'VKWebAppUpdateInsets'>  {
  return event.detail && event.detail.type === 'VKWebAppUpdateInsets';
}
