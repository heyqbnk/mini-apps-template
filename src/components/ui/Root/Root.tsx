import React, {ClassicElement, memo} from 'react';

import {Suspend} from '../../suspend/Suspend';
import {ViewTransition} from '../../suspend/ViewTransition';

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

export const Root = memo(function Root(props: RootProps) {
  const {children, activeView} = props;

  return (
    <Suspend activeElement={activeView} Transition={ViewTransition}>
      {children}
    </Suspend>
  );
});
