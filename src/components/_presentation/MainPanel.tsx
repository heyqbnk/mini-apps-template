import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {RouterLink} from '../RouterLink';
import {Link} from '../Link';
import {PanelHeader} from '../PanelHeader';
import {PanelsEnum, ViewsEnum} from '../../types';
import {Controls} from './Controls';
import {SectionItem} from './SectionItem';
import {Subtitle} from './Subtitle';

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
        <Controls/>
        <SectionItem>
          <Subtitle>Miscellaneous</Subtitle>
          <RouterLink
            to={{
              view: ViewsEnum.PresentationViewExample,
              panel: PanelsEnum.Main,
            }}
          >
            <Link className={mc.link}>Open new view</Link>
          </RouterLink>
        </SectionItem>
        <SectionItem>
          <Subtitle>Components</Subtitle>
          <RouterLink to={{panel: PanelsEnum.Button}}>
            <Link className={mc.link}>Button</Link>
          </RouterLink>
          <RouterLink to={{panel: PanelsEnum.Select}}>
            <Link className={mc.link}>Select</Link>
          </RouterLink>
          <RouterLink to={{panel: PanelsEnum.Input}}>
            <Link className={mc.link}>Input</Link>
          </RouterLink>
        </SectionItem>
      </div>
    </>
  );
});

