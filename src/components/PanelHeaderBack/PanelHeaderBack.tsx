import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles, withStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {Button} from '../Button';
import {RouterLink} from '../RouterLink';

import {useOS} from '../../hooks';

import {OS} from '../../types';
import {PanelHeaderBackProps} from './types';
import {ReactComponent as ChevronBackIcon} from '../../assets/chevron-back.svg';
import {ReactComponent as ArrowLeftOutlineIcon} from '../../assets/arrow-left-outline.svg';

const BackButton = withStyles({
  root: {border: 'none'},
  content: {padding: 0},
}, {name: 'PanelHeaderBackButton'})(Button);

const useStyles = makeStyles({
  root: {padding: 8},
  rootAndroid: {padding: 10, borderRadius: '50%'},
  icon: {display: 'block'},
}, {name: 'PanelHeaderBack'});

export const PanelHeaderBack = memo((props: PanelHeaderBackProps) => {
  const {...rest} = props;
  const mc = useStyles(props);
  const os = useOS();
  const isAndroid = os === OS.Android;

  return (
    <RouterLink pop={true}>
      <BackButton
        className={c(mc.root, {[mc.rootAndroid]: isAndroid})}
        variant={'tertiary'}
      >
        {isAndroid
          ? <ArrowLeftOutlineIcon className={mc.icon}/>
          : <ChevronBackIcon className={mc.icon}/>}
      </BackButton>
    </RouterLink>
  );
});
