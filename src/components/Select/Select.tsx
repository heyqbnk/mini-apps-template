import React, {memo, SelectHTMLAttributes} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {

}

const useStyles = makeStyles<Theme, Props>(theme => ({
  root: {},
}));

export const Select = memo((props: Props) => {
  const {className, ...rest} = props;
  const mc = useStyles(props);
  const rootClassName = c(mc.root, className);

  return <select className={rootClassName} {...rest}/>
});
