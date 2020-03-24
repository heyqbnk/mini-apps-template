import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';

import ActionSheetItem
  from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import ActionSheet
  from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';

import useStorage from '../hooks/useStorage';
import {useRootContext} from './RootContextProvider';
import {tapticNotification} from '../utils/taptic';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000000,
  },
});

const TOUCHES_COUNT_TO_SHOW = 3;

/**
 * Сервисная панель для каких-либо экстренных вещей. Например, когда у
 * пользователя возникает проблема связанная с тем, что у него какие-либо
 * невалидные данные в хранилище и его невозможно очистить кроме как на
 * клиентской стороне
 * @type {React.NamedExoticComponent<object>}
 */
const ServicePanel = memo(() => {
  const mc = useStyles();
  const {init} = useRootContext();
  const [, dropStorage] = useStorage();
  const [show, setShow] = useState(false);
  const showTimeoutRef = useRef<number | null>(null);

  const onClose = useCallback(() => setShow(false), []);

  useEffect(() => {
    // Ожидаем одновременного нажатия сразу N пальцами в
    // течение секунды и отображаем сервисную панель
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === TOUCHES_COUNT_TO_SHOW) {
        showTimeoutRef.current = window.setTimeout(() => {
          setShow(true);
        }, 1000);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length !== TOUCHES_COUNT_TO_SHOW) {
        // Отменяем показ как только кол-во тачей не равно N
        if (showTimeoutRef.current) {
          clearTimeout(showTimeoutRef.current);
        }
      }
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    }
  }, []);

  useEffect(() => {
    // Как только отобразили сервисную панель, посылаем тактильное уведомление
    if (show) {
      tapticNotification('success');
    }
  }, [show]);

  if (show) {
    return (
      <ActionSheet onClose={onClose} className={mc.root}>
        <ActionSheetItem onClick={init}>
          Перезапустить приложение
        </ActionSheetItem>
        <ActionSheetItem autoclose onClick={dropStorage}>
          Очистить хранилище ВКонтакте
        </ActionSheetItem>
      </ActionSheet>
    );
  }
  return null;
});

export default ServicePanel;
