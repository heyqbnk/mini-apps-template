import {useEffect, useRef} from 'react';

/**
 * Detects if mount was already done
 */
function useMounted(): boolean {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    }
  }, []);

  return ref.current;
}

export default useMounted;
