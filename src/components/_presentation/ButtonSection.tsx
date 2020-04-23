import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {Button} from '../Button';
import {PresentationSection} from './PresentationSection';
import {PresentationSectionItem} from './PresentationSectionItem';
import {PresentationTitle} from './PresentationTitle';
import {PresentationSubtitle} from './PresentationSubtitle';
import {ReactComponent as StarSvg} from '../../assets/star.svg';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '& + &': {
      marginTop: 15,
    },
  },
}));

export const ButtonSection = memo(() => {
  const mc = useStyles();

  return (
    <PresentationSection>
      <PresentationTitle>Button</PresentationTitle>
      <PresentationSectionItem>
        <PresentationSubtitle>Colors</PresentationSubtitle>
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
      </PresentationSectionItem>
      <PresentationSectionItem>
        <PresentationSubtitle>Sizes</PresentationSubtitle>
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
      </PresentationSectionItem>
      <PresentationSectionItem>
        <PresentationSubtitle>With before</PresentationSubtitle>
        <Button size={'l'} before={<StarSvg/>}>
          Add to favorites
        </Button>
      </PresentationSectionItem>
      <PresentationSectionItem>
        <PresentationSubtitle>As link</PresentationSubtitle>
        <Button href={'https://vk.com'} size={'l'}>
          Link to vk.com
        </Button>
      </PresentationSectionItem>
    </PresentationSection>
  );
});
