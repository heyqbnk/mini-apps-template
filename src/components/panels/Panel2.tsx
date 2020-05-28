import React, {memo} from 'react';

import {PanelHeader, Link} from 'vkma-ui';
import {RouterLink} from '../RouterLink';

import {PanelsEnum, ViewsEnum} from '../../types';

export const Panel2 = memo(function Panel2() {
  return (
    <>
      <PanelHeader>Panel 2</PanelHeader>
      <div style={{padding: 15}}>
        <RouterLink to={{view: ViewsEnum.Hello, panel: PanelsEnum.World}}>
          <Link>Go to panel 1</Link>
        </RouterLink>
      </div>
    </>
  );
});
