import {
  ReceiveMethodName,
  VKBridgeEvent,
  VKBridgeSuccessEvent,
} from '@vkontakte/vk-bridge';

// FIXME: https://github.com/VKCOM/vk-bridge/issues/55
/**
 * Утверждает что событие является VKWebAppUpdateConfig.
 * @param event
 */
export function isUpdateConfigEvent(
  event: VKBridgeEvent<ReceiveMethodName>,
): event is VKBridgeSuccessEvent<'VKWebAppUpdateConfig'> {
  return event.detail && event.detail.type === 'VKWebAppUpdateConfig';
}

// FIXME: https://github.com/VKCOM/vk-bridge/issues/55
/**
 * Утверждает что событие является VKWebAppUpdateInsets.
 * @param event
 */
export function isUpdateInsetsEvent(
  event: VKBridgeEvent<ReceiveMethodName>,
): event is VKBridgeSuccessEvent<'VKWebAppUpdateInsets'>  {
  return event.detail && event.detail.type === 'VKWebAppUpdateInsets';
}
