import React, {AnchorHTMLAttributes, memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
}

const useStyles = makeStyles<Theme, LinkProps>(theme => ({
  root: {
    color: theme.components.Link.color,
    textDecoration: 'none',
  },
}), {name: 'Link'});

export const Link = memo((props: LinkProps) => {
  const {className, ...rest} = props;
  const mc = useStyles(props);

  // eslint-disable-next-line
  return <a className={c(className, mc.root)} {...rest} />;
});
