import React, {memo, useState} from 'react';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

/**
 * Компонент, с которого начинается весь визуал и логика по отображению
 * необходимых элементов.
 * @type {React.NamedExoticComponent<object>}
 */
const App = memo(() => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <div onClick={() => setShowModal(true)}>Open</div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ModalHeader>Ошибка</ModalHeader>
        <ModalBody>
          <div style={{height: 5000}}>
            Какая-то ошибка ебана
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
});

export default App;
