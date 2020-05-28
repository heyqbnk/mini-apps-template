import React, {memo, useCallback, useMemo, useState} from 'react';

import {modalRootContext} from './context';

import {ModalRootContext, ModalRootProps} from './types';

const {Provider} = modalRootContext;

/**
 * Controller of active modal in application
 * @type {React.NamedExoticComponent<ModalRootProps>}
 */
export const ModalRoot = memo(function ModalRoot(props: ModalRootProps) {
  const {children} = props;
  const [activeModal, setActiveModal] = useState<symbol | null>(null);

  const unmountModal = useCallback((modalId: symbol | null) => {
    if (activeModal === modalId) {
      setActiveModal(null);
    }
  }, [activeModal]);

  const context = useMemo<ModalRootContext>(() => ({
    activeModal,
    mountModal: setActiveModal,
    unmountModal,
    rootNode: document.body,
  }), [activeModal, unmountModal]);

  return <Provider value={context}>{children}</Provider>;
});
