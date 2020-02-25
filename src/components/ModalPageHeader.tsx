import React, {memo} from 'react';
import c from 'classnames';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import {ITheme} from '../theme/types';

import VKModalPageHeader, {ModalPageHeaderProps}
  from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    '& .ModalPageHeader__content-in': {
      fontSize: 21,
      lineHeight: '26px',
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: theme.typography.fontFamilyTT,
    },
  },
}));

const ModalPageHeader = memo((props: ModalPageHeaderProps) => {
  const {className, ...rest} = props;
  const mc = useStyles(props);

  return <VKModalPageHeader className={c(className, mc.root)} {...rest}/>;
});

export default ModalPageHeader;
