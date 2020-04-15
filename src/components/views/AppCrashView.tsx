import React, {memo, useCallback, useState} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {copyToClipboard} from '../../utils/copying';

import FixedLayout
  from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPageHeader from '../ModalPageHeader';
import PanelHeaderButton
  from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import CopyIcon from '@vkontakte/icons/dist/24/copy';
// @ts-ignore FIXME: https://github.com/VKCOM/icons/issues/14
import DismissIcon from '@vkontakte/icons/dist/24/dismiss';

import emojiSadUrl from '../../assets/emoji-sad.base64.png';

interface IProps {
  onRestartClick(): void;
  error: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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

/**
 * Вью которая отображается в случае, когда в приложении произошла ошибка.
 * @type {React.NamedExoticComponent<IProps>}
 */
const AppCrashedView = memo((props: IProps) => {
  const {onRestartClick, error} = props;
  const mc = useStyles(props);
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
        <img className={mc.emoji} src={emojiSadUrl} alt={''}/>
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
      {/*// TODO ModalRoot global context */}
      <ModalRoot activeModal={showError ? '1' : null}>
        <ModalPage
          id={'1'}
          header={
            <ModalPageHeader right={
              <PanelHeaderButton onClick={() => setShowError(false)}>
                <DismissIcon className={mc.dismissIcon}/>
              </PanelHeaderButton>
            }>
              Ошибка
            </ModalPageHeader>
          }
          onClose={() => setShowError(false)}
        >
          <Div className={mc.error}>{error}</Div>
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
