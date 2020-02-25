import React, {memo, useCallback, useMemo, useState} from 'react';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import {ITheme} from '../theme/types';

import {toSrcSet} from '../utils/dom';

import FixedLayout
  from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPageHeader from './ModalPageHeader';
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import CopyIcon from '@vkontakte/icons/dist/24/copy';
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import DismissIcon from '@vkontakte/icons/dist/24/dismiss';

import x1Url from '../assets/emoji/sad/1x.png';
import x2Url from '../assets/emoji/sad/2x.png';
import x4Url from '../assets/emoji/sad/4x.png';
import {copyToClipboard} from '../utils/copying';

interface IProps {
  onRestartClick(): void;
  error: string;
}

const useStyles = makeStyles((theme: ITheme) => ({
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
  button: {
    '& + &': {
      marginTop: 10,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: theme.typography.fontFamilyTT,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: '30px',
    margin: 0,
  },
  error: {
    whiteSpace: 'pre-wrap',
  },
  header: {
    fontSize: 21,
    lineHeight: '26px',
  },
  dismissIcon: {
    color: '#818c99',
  },
}));

const AppCrashedView = memo((props: IProps) => {
  const {onRestartClick, error} = props;
  const mc = useStyles(props);
  const [showError, setShowError] = useState(false);
  const [copying, setCopying] = useState(false);
  const srcSet = useMemo(() => toSrcSet([
    [x1Url, '1x'], [x2Url, '2x'], [x4Url, '4x'],
  ]), []);

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
        <img className={mc.emoji} src={x1Url} srcSet={srcSet} alt={''}/>
        <p className={mc.title}>Упс, что-то сломалось</p>
        <FixedLayout vertical={'bottom'}>
          <Div>
            <Button
              size={'xl'}
              mode={'primary'}
              onClick={onRestartClick}
              className={mc.button}
            >
              Перезапустить приложение
            </Button>
            <Button
              size={'xl'}
              mode={'secondary'}
              onClick={() => setShowError(true)}
              className={mc.button}
            >
              Подробнее об ошибке
            </Button>
          </Div>
        </FixedLayout>
      </div>
      {/*// FIXME: https://github.com/VKCOM/VKUI/issues/533*/}
      <ModalRoot activeModal={(showError ? '1' : null) as any}>
        <ModalPage
          id={'1'}
          header={
            <ModalPageHeader
              right={
                <Div onClick={() => setShowError(false)}>
                  <DismissIcon className={mc.dismissIcon}/>
                </Div>
              }
            >
              Ошибка
            </ModalPageHeader>
          }
          // FIXME: https://github.com/VKCOM/VKUI/issues/531
          onClose={(() => setShowError(false)) as any}
        >
          <Div className={mc.error}>
            {error}
          </Div>
          <Div>
            <Button
              size={'xl'}
              mode={'secondary'}
              before={<CopyIcon/>}
              onClick={onCopyClick}
              disabled={copying}
            >
              Скопировать
            </Button>
          </Div>
        </ModalPage>
      </ModalRoot>
    </>
  );
});

export default AppCrashedView;
