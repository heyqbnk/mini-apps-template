import React, {memo, useEffect} from 'react';

import {AppTree} from '../AppTree';

import {useDoubleTapHandler, useRouter} from '../../hooks';
import {viewsTree} from '../../trees';

/**
 * Visual entry of application
 * @type {React.NamedExoticComponent<object>}
 */
export const App = memo(function App() {
  const {view, panel} = useRouter().currentState;
  const onTouchStart = useDoubleTapHandler();

  // Add handler which prevents scroll after double tapping the screen
  useEffect(() => {
    const body = document.documentElement;
    body.addEventListener('touchstart', onTouchStart, {passive: false});

    return () => body.removeEventListener('touchstart', onTouchStart);
  }, [onTouchStart]);

  return <AppTree tree={viewsTree} activeView={view} activePanel={panel}/>;
});
