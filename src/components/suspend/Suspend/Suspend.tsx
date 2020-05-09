import React, {
  memo,
  useState,
  useRef, Children,
} from 'react';

import {SuspendLastHistoryActionType, SuspendProps} from './types';

import {useEffectIfMounted} from '../../../hooks/useEffectIfMounted';

export const Suspend = memo(function Suspend(props: SuspendProps) {
  const {activeElement: parentActiveElement, children, Transition} = props;

  // All previously mounted elements
  const [mountedElements, setMountedElements] = useState([parentActiveElement]);

  // We do memoize active element due to we are unable to refresh parent
  // activeElement and enterType synchronously, thanks to useEffect
  const [activeElement, setActiveElement] = useState(parentActiveElement);

  // Previously mounted elements. Required to detect componentType
  const mountHistoryRef = useRef([parentActiveElement]);
  const [lastHistoryAction, setLastHistoryAction] =
    useState<SuspendLastHistoryActionType>('push');
  const [lastPoped, setLastPoped] = useState<string | null>(null);

  // React to new active element
  useEffectIfMounted(() => {
    // Add / remove new active element to / from history
    const mountHistory = mountHistoryRef.current;

    // Last mounted element
    const mountedLast = mountHistory[mountHistory.length - 1];

    // Mounted element right before the last one
    const mountedBeforeLast = mountHistory[mountHistory.length - 2];

    // If active element does not differ from last one, it means history
    // was not changed
    if (mountedLast !== parentActiveElement) {
      setLastPoped(mountedLast);

      // If mounted component before the last one is equal to new active
      // element, it means history pop was called
      if (mountedBeforeLast && mountedBeforeLast === parentActiveElement) {
        setLastHistoryAction('pop');
        mountHistoryRef.current =
          mountHistory.slice(0, mountHistory.length - 1);
      } else {
        setLastHistoryAction('push');
        mountHistoryRef.current = [...mountHistory, parentActiveElement];
      }
    }

    // Add new activeElement to previously mounted elements
    setMountedElements(mountedElements => {
      return mountedElements.includes(parentActiveElement)
        ? mountedElements
        : [...mountedElements, parentActiveElement];
    });

    // Update internal active element
    setActiveElement(parentActiveElement);
  }, [parentActiveElement]);

  // TODO: Probably TransitionGroup must be used
  // Select which children should be mounted and wrap them around passed
  // Transition component
  const displayElements = Children.map(children, c => {
    const {keepMounted, keepMountedAfterSuspend, id} = c.props;
    const isActive = id === activeElement;
    const wasMountedBefore = mountedElements.includes(id);

    return (
      <Transition
        isSuspended={!isActive}
        wasMountedBefore={wasMountedBefore}
        keepMountedAfterSuspend={!!keepMountedAfterSuspend}
        keepMounted={!!keepMounted}
        componentType={!isActive && lastPoped !== id
          ? 'alternative'
          : (lastHistoryAction === 'push'
              ? (lastPoped === id ? 'main' : 'alternative')
              : (lastPoped === id ? 'alternative' : 'main')
          )}
        key={id}
      >
        {c}
      </Transition>
    );
  });

  return <>{displayElements}</>;
});
