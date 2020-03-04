import {
  ReceiveMethodName,
  VKBridgeEvent,
  VKBridgeSuccessEvent,
} from '@vkontakte/vk-bridge';

/**
 * Утверждает что событие является VKWebAppUpdateConfig.
 * @param event
 */
export function isUpdateConfigEvent(
  event: VKBridgeEvent<ReceiveMethodName>,
): event is VKBridgeSuccessEvent<'VKWebAppUpdateConfig'> {
  // FIXME: https://github.com/VKCOM/vk-bridge/issues/60
  // @ts-ignore
  return event.detail && event.detail.type === 'VKWebAppUpdateConfig';
}

/**
 * Утверждает что событие является VKWebAppUpdateInsets.
 * @param event
 */
export function isUpdateInsetsEvent(
  event: VKBridgeEvent<ReceiveMethodName>,
): event is VKBridgeSuccessEvent<'VKWebAppUpdateInsets'>  {
  // FIXME: https://github.com/VKCOM/vk-bridge/issues/60
  // @ts-ignore
  return event.detail && event.detail.type === 'VKWebAppUpdateInsets';
}
