import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner';

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
    backgroundColor: 'white',
  },
});

/**
 * Вью которая отображается в случае, когда приложение загружается.
 * @type {React.NamedExoticComponent<object>}
 */
const AppLoadingView = memo(() => {
  const mc = useStyles();

  return (
    <div className={mc.root}>
      <Spinner size={'large'}/>
    </div>
  );
});

export default AppLoadingView;
