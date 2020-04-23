import React, {memo} from 'react';

import {PresentationView} from '../_presentation/PresentationView';

/**
 * Visual entry of application
 * @type {React.NamedExoticComponent<object>}
 */
export const App = memo(() => {
  return (
    <div>
      <PresentationView/>
    </div>
  );
});
