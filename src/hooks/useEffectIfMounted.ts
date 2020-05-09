import {DependencyList, EffectCallback, useEffect} from 'react';
import {useMounted} from './useMounted';

/**
 * Calls effect only in case component was already mounted
 */
export function useEffectIfMounted(
  effect: EffectCallback,
  deps: DependencyList,
): void {
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, effect, ...deps]);
}
