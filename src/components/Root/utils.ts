import {
  ReceiveMethodName,
  VKConnectEvent,
  VKConnectSuccessEvent,
} from '@vkontakte/vk-connect';

/**
 * VKWebAppUpdateInsets event result. There is no definition in package.
 * Issue: https://github.com/VKCOM/vk-connect/issues/45
 */
interface IUpdateInsetsResult {
  detail: {
    type: string;
    data: {
      insets: {
        top: number;
        left: number;
        bottom: number;
        right: number;
      };
    };
  };
}

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
  event: VKConnectEvent<any>,
): event is IUpdateInsetsResult {
  return event.detail && event.detail.type === 'VKWebAppUpdateInsets';
}
