import React, {
  cloneElement,
  memo,
  ReactElement,
} from 'react';

import {useRouter} from '../Router';

import {AppHistoryStateType} from '../../viewsTree';

export type RouterLinkProps = {
  children: ReactElement<{
    onClick(e: React.MouseEvent<any>): void;
  } | {
    href: string;
  }>;
} & ({
  /**
   * Defines which history state should be pushed
   */
  to: AppHistoryStateType;
} | {
  /**
   * Defines if history should be poped
   */
  pop: boolean;
});

export const RouterLink = memo((props: RouterLinkProps) => {
  const {children} = props;
  const {pushState, prevState, history, createHref} = useRouter();
  const onClick = (e: React.MouseEvent<any>) => {
    if ('to' in props) {
      pushState(props.to);
    } else {
      history.goBack();
    }

    if ('onClick' in children.props) {
      children.props.onClick(e);
    }
  };

  // If anchor is passed, we have to just replace href
  if ('href' in children.props) {
    if ('pop' in props) {
      if (prevState) {
        return cloneElement(children, {
          href: createHref(prevState),
        });
      }
      return cloneElement(children, {onClick});
    }
    return cloneElement(children, {href: createHref(props.to)});
  }

  return cloneElement(children, {onClick});
});
