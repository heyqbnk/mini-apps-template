import React, {memo, useCallback, useState} from 'react';

import {makeStyles, withStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {copyToClipboard} from '../../utils';

import {Button, useDevice} from 'vkma-ui';
import {Modal} from '../Modal';
import {ModalHeader} from '../ModalHeader';
import {ModalBody} from '../ModalBody';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import DismissIcon from '@vkontakte/icons/dist/24/dismiss';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import CopyIcon from '@vkontakte/icons/dist/24/copy';

import emojiSadImage from '../../assets/emoji-sad.png';

interface Props {
  onRestartClick(): void;
  error: string;
}

interface UseStylesProps extends Props {
  bottomInset: number;
}

const StyledModalHeader = withStyles({after: {padding: 0}})(ModalHeader);

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  emoji: {
    height: 80,
    margin: '0 auto 16px',
  },
  bottom: {
    flex: '0 0 auto',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: props => `0 16px ${props.bottomInset + 15}px`,
  },
  button: {
    '& + &': {
      marginTop: 10,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: theme.typography.fontFamilyTT,
    fontWeight: 600,
    lineHeight: '30px',
    margin: 0,
  },
  error: {whiteSpace: 'pre-wrap', marginBottom: 15},
  header: {fontSize: 21, lineHeight: '26px'},
  dismissButton: {padding: 14},
  dismissIcon: {color: '#818c99'},
}));

/**
 * View which appears when not catched exception raised in application
 * @type {React.NamedExoticComponent<Props>}
 */
export const AppCrashView = memo((props: Props) => {
  const {onRestartClick, error} = props;
  const {insets} = useDevice();
  const mc = useStyles({...props, bottomInset: insets.bottom});
  const [showError, setShowError] = useState(false);
  const [copying, setCopying] = useState(false);

  const onCopyClick = useCallback(async () => {
    setCopying(true);
    try {
      await copyToClipboard(error);
    } catch (e) {
    }
    setCopying(false);
  }, [error]);

  return (
    <>
      <div className={mc.root}>
        <img className={mc.emoji} src={emojiSadImage} alt={''}/>
        <p className={mc.title}>Упс, что-то сломалось</p>
        <div className={mc.bottom}>
          <Button
            className={mc.button}
            color={'primary'}
            fullWidth={true}
            onClick={onRestartClick}
          >
            Перезапустить приложение
          </Button>
          <Button
            className={mc.button}
            color={'secondary'}
            fullWidth={true}
            onClick={() => setShowError(true)}
          >
            Подробнее об ошибке
          </Button>
        </div>
      </div>
      <Modal show={showError} onClose={() => setShowError(false)}>
        <StyledModalHeader after={
          <div
            className={mc.dismissButton}
            onClick={() => setShowError(false)}
          >
            <DismissIcon className={mc.dismissIcon}/>
          </div>
        }>
          Ошибка
        </StyledModalHeader>
        <ModalBody>
          <div className={mc.error}>{error}</div>
          <Button
            fullWidth={true}
            color={'secondary'}
            before={<CopyIcon/>}
            onClick={onCopyClick}
            disabled={copying}
          >
            Скопировать
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
});
