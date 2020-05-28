import React, {memo} from 'react';

import {PanelHeader, Link} from 'vkma-ui';
import {RouterLink} from '../RouterLink';

import {PanelsEnum, ViewsEnum} from '../../types';

export const Panel1 = memo(function Panel1() {
  return (
    <>
      <PanelHeader>Panel 1</PanelHeader>
      <div style={{padding: 15}}>
        <RouterLink to={{view: ViewsEnum.Hello, panel: PanelsEnum.Underworld}}>
          <Link>Go to panel 2</Link>
        </RouterLink>
      </div>
    </>
  );
});
