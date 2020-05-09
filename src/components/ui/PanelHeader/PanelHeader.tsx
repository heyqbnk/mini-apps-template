import React, {memo, ReactNode} from 'react';
import c from 'classnames';

import {makeStyles, withStyles} from '@material-ui/styles';
import {Theme} from '../../../theme';

import {Button} from '../Button';
import {RouterLink} from '../../routing/RouterLink';

import {useDevice} from '../../providers/DeviceProvider';

import {ReactComponent as ArrowLeftOutlineIcon} from '../../../assets/arrow-left-outline.svg';
import {ReactComponent as ChevronBackIcon} from '../../../assets/chevron-back.svg';

import {
  PANEL_HEADER_HEIGHT_ANDROID,
  PANEL_HEADER_HEIGHT_IOS,
} from './constants';

import {OS} from '../../../types';
import {PanelHeaderProps} from './types';
import {usePanelTransition} from '../../suspend/PanelTransition';
import {useViewTransition} from '../../suspend/ViewTransition';

const BackButton = withStyles({
  root: {border: 'none'},
  content: {padding: 0},
}, {name: 'BackButton'})(Button);

interface UseStylesProps extends PanelHeaderProps {
  topInset: number;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: 'calc(100% - 8px)',
    height: PANEL_HEADER_HEIGHT_IOS - 8,
    padding: ({topInset}) => `${topInset + 4}px 4px 4px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.components.PanelHeader.backgroundColor,
  },
  rootTransitioning: {
    position: 'absolute',
  },
  rootAndroid: {
    height: PANEL_HEADER_HEIGHT_ANDROID - 8,
  },
  backButton: {
    padding: 8,
  },
  backButtonAndroid: {
    padding: 10,
    borderRadius: '50%',
  },
  backButtonIcon: {
    display: 'block',
  },
  before: {
    flex: '1 0 0',
  },
  beforeAndroid: {
    flex: '0 0 auto',
  },
  beforeEmpty: {},
  content: {
    flex: '1 0 auto',
    fontFamily: theme.typography.fontFamilyTT,
    fontSize: 21,
    lineHeight: 1,
    fontWeight: 800,
    textAlign: 'center',
  },
  contentAndroid: {
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 12,
  },
  after: {
    flex: '1 0 0',
  },
  afterAndroid: {
    flex: '0 0 auto',
  },
  afterEmpty: {},
}), {name: 'PanelHeader'});

export const PanelHeader = memo(function PanelHeader(props: PanelHeaderProps) {
  const {children, className, before, after, backButton, ...rest} = props;
  const {os, insets} = useDevice();
  const {isTransitioning: isPanelTransitioning} = usePanelTransition();
  const {isTransitioning: isViewTransitioning} = useViewTransition();
  const mc = useStyles({...props, topInset: insets.top});

  const isAndroid = os === OS.Android;
  const rootClassName = c(className, mc.root, {
    [mc.rootAndroid]: isAndroid,
    [mc.rootTransitioning]: isPanelTransitioning || isViewTransitioning,
  });
  const backButtonClassName = c(
    mc.backButton,
    {[mc.backButtonAndroid]: isAndroid},
  );
  const beforeClassName = c(mc.before, {
    [mc.beforeEmpty]: !before && !backButton,
    [mc.beforeAndroid]: isAndroid,
  });
  const contentClassName = c(mc.content, {[mc.contentAndroid]: isAndroid});
  const afterClassName = c(mc.after, {
    [mc.afterEmpty]: !after,
    [mc.afterAndroid]: isAndroid,
  });

  let backButtonNode: ReactNode = null;

  if (backButton) {
    backButtonNode = os === OS.IOS
      ? <ChevronBackIcon className={mc.backButtonIcon}/>
      : <ArrowLeftOutlineIcon className={mc.backButtonIcon}/>;
  }

  // TODO: Use panel context and render with Portal
  return (
    <div className={rootClassName} {...rest}>
      <div className={beforeClassName}>
        {backButtonNode &&
        <RouterLink pop={true}>
          <BackButton className={backButtonClassName} variant={'tertiary'}>
            {backButtonNode}
          </BackButton>
        </RouterLink>}
        {before}
      </div>
      <div className={contentClassName}>{children}</div>
      <div className={afterClassName}>{after}</div>
    </div>
  );
});
