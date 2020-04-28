import {Insets} from '../types';
import {useSelector} from './useSelector';

/**
 * Returns initial device insets
 */
export function useInsets(): Insets {
  return useSelector(state => state.device.insets);
}
