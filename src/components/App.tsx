import React, {memo} from 'react';

/**
 * Компонент, с которого начинается весь визуал и логика по отображению
 * необходимых элементов.
 * @type {React.NamedExoticComponent<object>}
 */
const App = memo(() => {
  return (
    <div>
      Hello world
    </div>
  );
});

export default App;
