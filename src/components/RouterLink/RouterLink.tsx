import {
  ClassicElement,
  cloneElement,
  memo,
  useCallback,
  MouseEvent,
} from 'react';

import {useActions} from '../../hooks';
import {routingActions, RoutingHistoryStateType} from '../../redux/reducers';

export interface RouterLinkProps {
  children: ClassicElement<{ onClick(e: MouseEvent<any>): void }>;
  to: RoutingHistoryStateType;
}

export const RouterLink = memo((props: RouterLinkProps) => {
  const {children, to} = props;
  const {onClick, ...rest} = children.props;
  const pushRouterHistoryState =
    useActions(routingActions.pushRouterHistoryState);
  const _onClick = useCallback((e: MouseEvent<any>) => {
    pushRouterHistoryState(to);

    if (onClick) {
      onClick(e);
    }
  }, [onClick, pushRouterHistoryState, to]);

  return cloneElement(children, {...rest, onClick: _onClick});
});
