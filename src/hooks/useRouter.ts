import {useRouter as useVKRouter} from 'vkma-router';
import {AppTree} from '../trees';

/**
 * Application context hook which uses router
 * @returns {RouterContext<AppTree> | null}
 */
export const useRouter = () => {
  const router = useVKRouter<AppTree>();

  if (!router) {
    throw new Error('useRouter hook was called outside of Router context');
  }

  return router;
};
