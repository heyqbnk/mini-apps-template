import React, {memo, useEffect} from 'react';

import {Root} from '../Root';
import {View} from '../View';
import {Panel} from '../Panel';
import {MainPanel} from '../_presentation/MainPanel';
import {ButtonPanel} from '../_presentation/ButtonPanel';
import {SelectPanel} from '../_presentation/SelectPanel';
import {InputPanel} from '../_presentation/InputPanel';

import {useDoubleTapHandler} from '../../hooks';

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
    <Root>
      <View id={'presentation'}>
        <Panel id={'main'} header={true} component={MainPanel}/>
        <Panel id={'button'} header={true} component={ButtonPanel}/>
        <Panel id={'select'} header={true} component={SelectPanel}/>
        <Panel id={'input'} header={true} component={InputPanel}/>
      </View>
    </Root>
  );
});
