import {Router as VKRouter, RouterProps} from 'vkma-router';
import {ComponentType} from 'react';
import {AppTree} from '../../trees';

export const Router: ComponentType<RouterProps<AppTree>> = VKRouter;
