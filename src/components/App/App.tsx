import React, {memo, useEffect} from 'react';

import {PresentationView} from '../_presentation/PresentationView';
import {useDoubleTapHandler} from '../../hooks/useDoubleTapHandler';

/**
 * Visual entry of application
 * @type {React.NamedExoticComponent<object>}
 */
export const App = memo(() => {
  const onTouchStart = useDoubleTapHandler();

  // Add handler which prevents scroll after double tapping the screen
  useEffect(() => {
    const body = document.documentElement;
    body.addEventListener('touchstart', onTouchStart, {passive: false});

    return () => body.removeEventListener('touchstart', onTouchStart);
  }, [onTouchStart]);

  return (
    <div>
      <PresentationView/>
    </div>
  );
});
