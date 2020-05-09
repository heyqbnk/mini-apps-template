import {SVGAttributes} from 'react';
import {ButtonProps} from '../Button';

export interface PanelHeaderBackProps extends ButtonProps {
  buttonProps?: ButtonProps;
  iconProps?: SVGAttributes<SVGSVGElement>;
}
