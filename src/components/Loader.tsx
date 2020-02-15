import React, {memo} from 'react';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';

import logoUrl from '../assets/logo.svg';
import logoArrowsUrl from '../assets/logo-arrows.svg';

interface IProps {
  size: number;
}

const useStyles = makeStyles<{}, IProps>({
  root: {
    position: 'relative',
    width: ({size}) => size,
    height: ({size}) => size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrows: {
    position: 'absolute',
    width: '100%',
    animation: '$spin infinite 1300ms linear',
  },
  logo: {
    height: ({size}) => size - 5,
    width: ({size}) => size - 5,
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg) scale(1)',
    },
    '50%': {
      transform: 'rotate(180deg) scale(1.2)',
    },
    to: {
      transform: 'rotate(360deg) scale(1)',
    },
  },
});

const Loader = memo((props: IProps) => {
  const mc = useStyles(props);

  return (
    <div className={mc.root}>
      <img className={mc.arrows} src={logoArrowsUrl}/>
      <img className={mc.logo} src={logoUrl}/>
    </div>
  );
});

export default Loader;
