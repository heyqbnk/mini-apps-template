import React, {memo} from 'react';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';

import Loader from './Loader';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppLoadingView = memo(() => {
  const mc = useStyles();

  return (
    <div className={mc.root}>
      <Loader size={40}/>
    </div>
  );
});

export default AppLoadingView;
