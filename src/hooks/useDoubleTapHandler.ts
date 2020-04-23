import {useCallback, useRef} from 'react';

type OnTouchStart = (event: TouchEvent) => void;

interface Meta {
  lastTapAt: number;
  lastClientX: number;
  lastClientY: number;
}

/**
 * Returns handler which prevents from scrolling while double tapping
 * screen
 */
export function useDoubleTapHandler(): OnTouchStart {
  // Ensure touches occur rapidly
  const delay = 1000;

  // Sequential touches must be in close vicinity
  const minZoomTouchDelta = 10;

  // Track state of the last touch
  const meta = useRef<Meta>({
    lastTapAt: 0,
    lastClientX: 0,
    lastClientY: 0,
  });

  return useCallback<OnTouchStart>(event => {
    // Exit early if this involves more than one finger (e.g. pinch to zoom)
    if (event.touches.length > 1) {
      return;
    }

    const tapAt = new Date().getTime();
    const timeDiff = tapAt - meta.current.lastTapAt;
    const {clientX, clientY} = event.touches[0];
    const xDiff = Math.abs(meta.current.lastClientX - clientX);
    const yDiff = Math.abs(meta.current.lastClientY - clientY);
    if (
      xDiff < minZoomTouchDelta &&
      yDiff < minZoomTouchDelta &&
      event.touches.length === 1 &&
      timeDiff < delay
    ) {
      event.preventDefault();

      // Trigger a fake click for the tap we just prevented
      if (event.target) {
        event.target.dispatchEvent(new Event('click', {
          bubbles: true,
          cancelable: true,
        }));
      }
    }
    meta.current.lastClientX = clientX;
    meta.current.lastClientY = clientY;
    meta.current.lastTapAt = tapAt;
  }, []);
}
