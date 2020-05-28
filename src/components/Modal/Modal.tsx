import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {createPortal} from 'react-dom';

import {makeStyles} from '@material-ui/styles';

import {CSSTransition} from 'react-transition-group';

import {useModalRootContext} from '../ModalRoot';
import {modalContext} from './context';

import {CSSTransitionClassNames} from 'react-transition-group/CSSTransition';
import {ModalContext, ModalProps} from './types';

const CLEAR_ZONE = 50;
const VK_CONTROLS_HEIGHT = 44;
const TRANSITION_DURATION = 300;
const {Provider} = modalContext;

const useStyles = makeStyles({
  enter: {
    '& $backdrop': {backgroundColor: 'transparent'},
    '& $panel': {transform: 'translateY(100%)'},
  },
  enterActive: {
    '& $backdrop': {backgroundColor: 'rgba(0,0,0,.4)'},
    '& $panel': {transform: 'translateY(0)'},
  },
  exit: {
    '& $backdrop': {backgroundColor: 'rgba(0,0,0,.4)'},
    '& $panel': {transform: 'translateY(0)'},
  },
  exitActive: {
    '& $root': {pointerEvents: 'none'},
    '& $backdrop': {backgroundColor: 'transparent'},
    '& $panel': {transform: 'translateY(100%)'},
  },
  exitDone: {},
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    overflow: 'hidden',
    paddingTop: VK_CONTROLS_HEIGHT + CLEAR_ZONE,
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    transition: `${TRANSITION_DURATION}ms background-color`,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    transition: `${TRANSITION_DURATION}ms all`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

/**
 * Modal which pops out from bottom
 * @type {React.NamedExoticComponent<Props>}
 */
export const Modal = memo((props: ModalProps) => {
  const {show, onClose, onClosed, keepMounted, children} = props;

  const {
    enter, enterActive, exit, exitActive, exitDone, ...mc
  } = useStyles(props);
  const {
    rootNode, activeModal, unmountModal, mountModal,
  } = useModalRootContext();

  const [header, setHeader] = useState<HTMLElement | null>();
  const [body, setBody] = useState<HTMLElement | null>();
  const context = useMemo<ModalContext>(() => ({
    registerBody: setBody,
    registerHeader: setHeader,
  }), []);

  // Close modal on backdrop click
  const onBackdropClick = useCallback(() => {
    // If onClose callback is defined, call it. We are expecting this callback
    // to update "show" property from outside
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Calculates panel height
  const calculatePanelHeight = useCallback(() => {
    const headerHeight = header ? header.clientHeight : 0;
    let bodyHeight = 0;

    if (body && body.firstElementChild) {
      // Body height becomes height of first child with offsets
      bodyHeight = body.firstElementChild.scrollHeight;
    }

    const nomineeHeight = headerHeight + bodyHeight;
    const maxHeight = rootNode.clientHeight - VK_CONTROLS_HEIGHT
      - CLEAR_ZONE;

    return nomineeHeight > maxHeight ? maxHeight : nomineeHeight;
  }, [header, body, rootNode]);

  const [panelHeight, setPanelHeight] = useState(calculatePanelHeight);

  const modalId = useMemo(Symbol, []);
  const isShown = modalId === activeModal;
  const classNames = useMemo<CSSTransitionClassNames>(
    () => ({enter, enterActive, exit, exitActive, exitDone}),
    [enter, enterActive, exit, exitActive, exitDone],
  );

  // When show is changed, notify root that modal should be mounted or unmounted
  useEffect(() => {
    if (show) {
      mountModal(modalId);
    } else {
      unmountModal(modalId);
    }
  }, [show, mountModal, unmountModal, modalId]);

  // When modal unmounts, notify root that it should unregister modal
  useEffect(() => () => unmountModal(modalId), [modalId, unmountModal]);

  // Hide or show overflow in case, modal state changed
  // TODO: Replace with layout actions
  useEffect(() => {
    document.body.style.overflow = isShown ? 'hidden' : '';
    document.body.style.height = isShown ? '100%' : '';
  }, [isShown]);

  // Watch for body changes to update height of modal
  useEffect(() => {
    if (body) {
      const obs = new MutationObserver(() => {
        setPanelHeight(calculatePanelHeight);
      });

      obs.observe(body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => obs.disconnect();
    }
  }, [calculatePanelHeight, body]);

  // When calculatePanelHeight changed, it means, header, body or rootNode
  // were changed and we need to recalculate panel height
  useEffect(
    () => setPanelHeight(calculatePanelHeight()), [calculatePanelHeight],
  );

  return createPortal(
    <Provider value={context}>
      <CSSTransition
        classNames={classNames}
        timeout={TRANSITION_DURATION}
        in={isShown}
        addEndListener={onClosed}
        unmountOnExit={!keepMounted}
      >
        <div className={mc.root}>
          <div className={mc.backdrop} onClick={onBackdropClick}/>
          <div className={mc.panel} style={{height: panelHeight}}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Provider>,
    rootNode,
  );
});
