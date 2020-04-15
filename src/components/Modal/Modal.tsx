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
const {Provider} = modalContext;

const useStyles = makeStyles({
  enter: {
    '& $backdrop': {
      backgroundColor: 'transparent',
    },
    '& $panel': {
      transform: 'translateY(100%)',
    },
  },
  enterActive: {
    '& $backdrop': {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    '& $panel': {
      transform: 'translateY(0)',
    },
  },
  enterDone: {},
  exit: {
    '& $backdrop': {
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    '& $panel': {
      transform: 'translateY(0)',
    },
  },
  exitActive: {
    '& $root': {
      pointerEvents: 'none',
    },
    '& $backdrop': {
      backgroundColor: 'transparent',
    },
    '& $panel': {
      transform: 'translateY(100%)',
    },
  },
  exitDone: {},
  root: {
    position: 'absolute',
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
    transition: '200ms background-color',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    transition: '200ms transform',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

/**
 * Modal
 * @type {React.NamedExoticComponent<Props>}
 */
const Modal = memo((props: ModalProps) => {
  const {show, onClose, onClosed, keepMounted, children} = props;

  const {
    enter, enterActive, enterDone, exit, exitActive, exitDone, ...mc
  } = useStyles(props);
  const {
    rootNode, activeModal, unmountModal, mountModal,
  } = useModalRootContext();

  const [header, setHeader] = useState<HTMLElement | null>();
  const [body, setBody] = useState<HTMLElement | null>();

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
      // Adding default body bottom padding
      bodyHeight += 14;
      const innerChildren = body.firstElementChild.children;

      for (let i = 0; i < innerChildren.length; i++) {
        const item = innerChildren.item(i) as HTMLElement;

        if (item) {
          bodyHeight += item.offsetHeight;
        }
      }
    }

    const nomineeHeight = headerHeight + bodyHeight;
    const maxHeight = rootNode.clientHeight - VK_CONTROLS_HEIGHT
      - CLEAR_ZONE;

    return nomineeHeight > maxHeight ? maxHeight : nomineeHeight;
  }, [header, body, rootNode]);

  const [panelHeight, setPanelHeight] = useState(calculatePanelHeight);

  const context = useMemo<ModalContext>(() => ({
    registerBody: setBody,
    registerHeader: setHeader,
  }), []);
  const modalId = useMemo(Symbol, []);
  const isShown = modalId === activeModal;
  const timeout = useMemo(() => ({enter: 200, exit: 200}), []);
  const classNames = useMemo<CSSTransitionClassNames>(() => ({
    enter, enterActive, enterDone, exit, exitActive, exitDone,
  }), [enter, enterActive, enterDone, exit, exitActive, exitDone]);

  // When show is changed, mount or unmount modal
  useEffect(() => {
    if (show) {
      mountModal(modalId);
    } else {
      unmountModal(modalId);
    }
  }, [show, mountModal, unmountModal, modalId]);

  // When modal unmounts, call unmount handler
  useEffect(() => () => unmountModal(modalId), [modalId, unmountModal]);

  // Hide or show overflow in case, modal state changed
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
        timeout={timeout}
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

export default Modal;
