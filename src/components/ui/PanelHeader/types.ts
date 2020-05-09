import {HTMLAttributes, ReactNode, ReactNodeArray} from 'react';

export interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  before?: ReactNode | ReactNodeArray;
  after?: ReactNode | ReactNodeArray;
  backButton?: boolean;
}
