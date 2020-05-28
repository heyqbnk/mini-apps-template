import
  // React,
{memo, useEffect, useRef, useState} from 'react';

// import {makeStyles} from '@material-ui/styles';

// import ActionSheetItem
//   from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
// import ActionSheet
//   from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';

// import {useStorage} from '../../../hooks';
// import {useAppRootContext} from '../../app/AppRoot';
import {tapticNotification} from '../../../utils';

// const useStyles = makeStyles({
//   root: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1000000,
//   },
// });

const TOUCHES_COUNT_TO_SHOW = 3;

/**
 * Service panel for some emergency cases. For example, when user has
 * problem connected with incorrect data in VK storage and we cannot solve
 * this problem remotely (due to, it an be done only from JS)
 * @type {React.NamedExoticComponent<object>}
 */
export const ServicePanel = memo(() => {
  // const mc = useStyles();
  // const {init} = useAppRootContext();
  // const {clear} = useStorage();
  const [show, setShow] = useState(false);
  const showTimeoutRef = useRef<number | null>(null);

  // const onClose = useCallback(() => setShow(false), []);

  useEffect(() => {
    // Wait for simultaneous touch of N fingers during a second and show
    // service panel
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === TOUCHES_COUNT_TO_SHOW) {
        showTimeoutRef.current = window.setTimeout(() => {
          setShow(true);
        }, 1000);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      // Decline service panel show in case when touches count is not equal to N
      if (e.touches.length !== TOUCHES_COUNT_TO_SHOW) {
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
    };
  }, []);

  useEffect(() => {
    // When service panel is shown, send taptic notification
    if (show) {
      tapticNotification('success');
    }
  }, [show]);

  // FIXME: Realise
  // if (show) {
  //   return (
  //     <ActionSheet onClose={onClose} className={mc.root}>
  //       <ActionSheetItem onClick={init}>
  //         Перезапустить приложение
  //       </ActionSheetItem>
  //       <ActionSheetItem autoclose onClick={() => clear()}>
  //         Очистить хранилище ВКонтакте
  //       </ActionSheetItem>
  //     </ActionSheet>
  //   );
  // }
  return null;
});
