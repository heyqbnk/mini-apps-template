import React, {memo, ReactNode, ReactNodeArray, useEffect, useRef} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {useDevice} from 'vkma-ui';
import {useModalContext} from '../Modal';

interface Props {
  children: ReactNode | ReactNodeArray;
}

interface UseStylesProps extends Props {
  bottomInset: number;
}

const useStyles = makeStyles<Theme, UseStylesProps>({
  root: {
    overflow: 'hidden',
    flex: '1 0 0',
  },
  inner: {
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'white',
    padding: ({bottomInset}) => `0 14px ${bottomInset + 14}px`,
    boxSizing: 'border-box',
  },
});

/**
 * Modal body
 * @type {React.NamedExoticComponent<Props>}
 */
export const ModalBody = memo((props: Props) => {
  const {children} = props;
  const {insets} = useDevice();
  const mc = useStyles({...props, bottomInset: insets.bottom});
  const rootRef = useRef<HTMLDivElement>(null);
  const {registerBody} = useModalContext();

  // Register body in parent modal
  useEffect(() => {
    if (rootRef.current) {
      registerBody(rootRef.current);
    }
  }, [registerBody]);

  return (
    <div className={mc.root} ref={rootRef}>
      <div className={mc.inner}>
        {children}
      </div>
    </div>
  );
});
