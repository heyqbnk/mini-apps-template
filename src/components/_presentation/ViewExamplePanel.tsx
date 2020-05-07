import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../PanelHeader';
import {Controls} from './Controls';
import {Link} from '../Link';
import {RouterLink} from '../RouterLink';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const ViewExamplePanel = memo(() => {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>View example</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        It is some new view. You can{' '}
        <RouterLink pop={true}>
          <Link>go back</Link>
        </RouterLink>{' '}
        now.
      </div>
    </>
  );
});

