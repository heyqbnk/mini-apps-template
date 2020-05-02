import React, {ClassicElement, memo} from 'react';

import {Suspend} from '../Suspend';

import {ViewProps} from '../View';

export interface RootProps {
  /**
   * Views
   */
  children: ClassicElement<ViewProps> | ClassicElement<ViewProps>[];
  /**
   * Currently active view
   */
  activeView: string;
}

export const Root = memo((props: RootProps) => {
  const {children, activeView} = props;
  return <Suspend activeElement={activeView}>{children}</Suspend>;
});
