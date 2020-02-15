import {
  ReceiveMethodName,
  VKConnectEvent,
  VKConnectSuccessEvent,
} from '@vkontakte/vk-connect';

export function isUpdateConfigEvent(
  event: VKConnectEvent<ReceiveMethodName>,
): event is VKConnectSuccessEvent<'VKWebAppUpdateConfig'> {
  return event.detail && event.detail.type === 'VKWebAppUpdateConfig';
}
