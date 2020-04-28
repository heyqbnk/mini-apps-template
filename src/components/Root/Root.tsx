import React, {ClassicElement, memo} from 'react';

import {Suspend} from '../Suspend';

import {useHistoryState} from '../../hooks';

import {ViewProps} from '../View';

export interface ViewControllerProps {
  /**
   * Views array
   */
  children: ClassicElement<ViewProps> | ClassicElement<ViewProps>[];
}

export const Root = memo((props: ViewControllerProps) => {
  const {children} = props;
  const {view} = useHistoryState();

  return <Suspend activeElement={view}>{children}</Suspend>;
});
