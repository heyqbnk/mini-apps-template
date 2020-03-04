import React, {memo} from 'react';

/**
 * "Лицо" приложения. С этого компонента в приложении начинается весь визуал.
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
