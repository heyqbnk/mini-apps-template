import {RouterLink as VKRouterLink, RouterLinkProps} from 'vkma-router';
import {ComponentType} from 'react';
import {AppTree} from '../../trees';

export const RouterLink: ComponentType<RouterLinkProps<AppTree>> = VKRouterLink;
