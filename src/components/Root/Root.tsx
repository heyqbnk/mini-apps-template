import React, {ClassicElement, memo} from 'react';

import {Suspend} from '../Suspend';

import {ViewProps} from '../View';

import {useRouter} from '../Router';

export interface ViewControllerProps {
  /**
   * Views array
   */
  children: ClassicElement<ViewProps> | ClassicElement<ViewProps>[];
}

export const Root = memo((props: ViewControllerProps) => {
  const {children} = props;
  const {currentState} = useRouter();

  return <Suspend activeElement={currentState.view}>{children}</Suspend>;
});
