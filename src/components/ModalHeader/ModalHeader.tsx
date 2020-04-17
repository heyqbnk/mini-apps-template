import React, {memo, ReactNode, ReactNodeArray, useEffect, useRef} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {useModalContext} from '../Modal';

interface Props {
  before?: ReactNode | ReactNodeArray;
  after?: ReactNode | ReactNodeArray;
  children: ReactNode | ReactNodeArray;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: '14px 14px 0 0',
    flex: '0 0 auto',
  },
  before: {
    padding: 14,
  },
  after: {
    padding: 14,
  },
  content: {
    fontFamily: theme.typography.fontFamilyTT,
    fontWeight: theme.typography.fontWeightSemiBold,
    fontSize: 21,
    lineHeight: '26px',
    textAlign: 'center',
    padding: 14,
  },
}));

/**
 * Modal header
 * @type {React.NamedExoticComponent<Props>}
 */
export const ModalHeader = memo((props: Props) => {
  const {before, after, children} = props;
  const mc = useStyles(props);
  const rootRef = useRef<HTMLDivElement>(null);
  const {registerHeader} = useModalContext();

  // Register header in parent modal
  useEffect(() => {
    if (rootRef.current) {
      registerHeader(rootRef.current);
    }
  }, [registerHeader]);

  return (
    <div className={mc.root} ref={rootRef}>
      <div className={mc.before}>
        {before}
      </div>
      <div className={mc.content}>
        {children}
      </div>
      <div className={mc.after}>
        {after}
      </div>
    </div>
  );
});
