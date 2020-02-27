import React, {memo, useCallback, useEffect, useMemo} from 'react';
import useStorageValue from '../hooks/useStorageValue';
import {EStorageField} from '../types/bridge';

/**
 * "Лицо" приложения. С этого компонента в приложении начинается весь визуал.
 * @type {React.NamedExoticComponent<object>}
 */
const App = memo(() => {
  const [visited, setVisited] =
    useStorageValue(EStorageField.ApplicationVisited);
  const initialVisited = useMemo(() => visited, []);

  const onForgetClick = useCallback(() => {
    setVisited(false);
    window.location.reload();
  }, [setVisited]);

  useEffect(() => {
    // При загрузке приложения записываем факт появления в нем. При
    // перезагрузке страницы приложение уже будет знать, что пользователь в
    // нем был.
    setVisited(true);
  }, [setVisited]);

  return (
    <div>
      {initialVisited
        ? 'Кажется, я уже видел тебя где-то'
        : 'О, ты тут впервые. Привет!'}
      {initialVisited &&
      <button onClick={onForgetClick}>Забыть меня</button>}
    </div>
  );
});

export default App;
