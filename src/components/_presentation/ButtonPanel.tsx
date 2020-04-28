import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../PanelHeader';
import {SectionItem} from './SectionItem';
import {Subtitle} from './Subtitle';
import {Button} from '../Button';
import {Controls} from './Controls';
import {ReactComponent as StarSvg} from '../../assets/star.svg';

const useStyles = makeStyles({
  root: {
    padding: '0 18px',
  },
  link: {
    display: 'block',

    '& + &': {
      marginTop: 10,
    },
  },
  item: {
    '& + &': {
      marginTop: 15,
    },
  },
});

export const ButtonPanel = memo(() => {
  const mc = useStyles();

  return (
    <>
      <PanelHeader>Button</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <SectionItem>
          <Subtitle>Colors</Subtitle>
          <div className={mc.item}>
            <Button>Primary</Button>
          </div>
          <div className={mc.item}>
            <Button color={'secondary'}>Secondary</Button>
          </div>
          <div className={mc.item}>
            <Button color={'tertiary'}>Tertiary</Button>
          </div>
          <div className={mc.item}>
            <Button color={'outline'}>Outline</Button>
          </div>
        </SectionItem>
        <SectionItem>
          <Subtitle>Sizes</Subtitle>
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
        </SectionItem>
        <SectionItem>
          <Subtitle>With before</Subtitle>
          <Button size={'l'} before={<StarSvg/>}>
            Add to favorites
          </Button>
        </SectionItem>
        <SectionItem>
          <Subtitle>As link</Subtitle>
          <Button href={'https://vk.com'} size={'l'}>
            Link to vk.com
          </Button>
        </SectionItem>
      </div>
    </>
  );
});
