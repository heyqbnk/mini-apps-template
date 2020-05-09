import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {Suspend} from '../../suspend/Suspend';
import {PanelTransition} from '../../suspend/PanelTransition';

import {ViewProps} from './types';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
}, {name: 'View'});

export const View = memo(function View(props: ViewProps) {
  const {
    children, className, keepMounted, keepMountedAfterSuspend,
    activePanel, id, ...rest
  } = props;
  const mc = useStyles(props);

  return (
    <div className={c(mc.root, className)} data-id={id} {...rest}>
      <Suspend activeElement={activePanel} Transition={PanelTransition}>
        {children}
      </Suspend>
    </div>
  );
});
