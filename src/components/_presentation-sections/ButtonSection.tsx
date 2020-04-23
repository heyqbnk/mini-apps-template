import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {Button} from '../Button';
import {ReactComponent as StarSvg} from '../../assets/star.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 18,
    backgroundColor: 'white',
  },
  section: {
    '& + &': {
      marginTop: 25,
    },
  },
  title: {
    fontWeight: 500,
    fontSize: 24,
    margin: '15px 0',
  },
  subtitle: {
    fontSize: 16,
    margin: '12px 0',
    color: theme.palette.text.secondary,
  },
  item: {
    '& + &': {
      marginTop: 10,
    },
  },
}));

export const ButtonSection = memo(() => {
  const mc = useStyles();

  return (
    <div>
      <div className={mc.title}>Button</div>
      <div className={mc.section}>
        <div className={mc.subtitle}>Colors</div>
        <div className={mc.item}>
          <Button>Primary</Button>
        </div>
        <div className={mc.item}>
          <Button color={'secondary'}>Secondary</Button>
        </div>
        <div className={mc.item}>
          <Button color={'tertiary'}>Tertiary</Button>
        </div>
      </div>
      <div className={mc.section}>
        <div className={mc.subtitle}>Sizes</div>
        <div className={mc.item}>
          <Button>Medium</Button>
        </div>
        <div className={mc.item}>
          <Button size={'l'}>Large</Button>
        </div>
        <div className={mc.item}>
          <Button size={'xl'} color={'secondary'} fullWidth={true}>
            Extra large
          </Button>
        </div>
      </div>
      <div className={mc.section}>
        <div className={mc.subtitle}>With before</div>
        <Button size={'l'} before={<StarSvg/>}>
          Add to favorites
        </Button>
      </div>
      <div className={mc.section}>
        <div className={mc.subtitle}>As link</div>
        <Button href={'https://vk.com'} size={'l'}>
          Link to vk.com
        </Button>
      </div>
    </div>
  );
});
