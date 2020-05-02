import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {RouterLink} from '../RouterLink';
import {Link} from '../Link';
import {PanelHeader} from '../PanelHeader';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
  link: {
    display: 'block',

    '& + &': {
      marginTop: 10,
    },
  },
});

export const MainPanel = memo(() => {
  const mc = useStyles();

  return (
    <>
      <PanelHeader>Components</PanelHeader>
      <div className={mc.root}>
        <RouterLink to={{panel: 'button'}}>
          <Link className={mc.link} href={'#'}>Button</Link>
        </RouterLink>
        <RouterLink to={{panel: 'select'}}>
          <Link className={mc.link} href={'#'}>Select</Link>
        </RouterLink>
        <RouterLink to={{panel: 'input'}}>
          <Link className={mc.link} href={'#'}>Input</Link>
        </RouterLink>
      </div>
    </>
  );
});

