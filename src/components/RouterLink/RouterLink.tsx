import {
  cloneElement,
  memo,
  useCallback,
  MouseEvent,
  ReactElement,
} from 'react';

import {useRouter, HistoryStateType} from '../Router';

export interface RouterLinkProps {
  children: ReactElement<{
    onClick?(e: MouseEvent<any>): void;
    href?: string;
  }>;
  /**
   * Defines which history state should be pushed
   */
  to?: HistoryStateType;
  /**
   * Defines if history should be poped
   */
  pop?: boolean;
}

export const RouterLink = memo((props: RouterLinkProps) => {
  const {children, to, pop} = props;
  const {onClick, ...rest} = children.props;
  const {pushState, history} = useRouter();
  const _onClick = useCallback((e: MouseEvent<any>) => {
    if (to) {
      pushState(to);
    } else if (pop) {
      history.goBack();
    }

    if (onClick) {
      onClick(e);
    }
  }, [onClick, pushState, to, pop, history]);

  return cloneElement(
    children,
    {
      ...rest,
      onClick: _onClick,
      href: undefined,
    },
  );
});
