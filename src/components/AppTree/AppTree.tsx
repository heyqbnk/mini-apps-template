import React, {memo} from 'react';

import {Root} from '../Root';
import {View} from '../View';
import {Panel} from '../Panel';

import {AppTreeProps} from './types';

export const AppTree = memo((props: AppTreeProps) => {
  const {tree, activePanel, activeView} = props;

  return (
    <Root activeView={activeView}>
      {Object.keys(tree).map(viewId => {
        const {as: TreeViewComponent, panels, ...restView} = tree[viewId];
        const ViewComponent = TreeViewComponent || View;

        return (
          <ViewComponent
            id={viewId}
            activePanel={activePanel}
            key={viewId}
            {...restView}
          >
            {Object.keys(panels).map(panelId => {
              const {as: TreePanelComponent, ...restPanel} = panels[panelId];
              const PanelComponent = TreePanelComponent || Panel;

              return (
                <PanelComponent id={panelId} key={panelId} {...restPanel}/>
              );
            })}
          </ViewComponent>
        );
      })}
    </Root>
  );
});
