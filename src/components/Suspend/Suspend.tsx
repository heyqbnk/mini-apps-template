import React, {
  memo,
  useEffect,
  cloneElement,
  useState, useRef,
} from 'react';

import {isEachChildHasUniqueId} from './utils';

import {
  SuspendableOptionalProps,
  SuspendLastHistoryActionType,
  SuspendProps,
} from './types';

export const Suspend = memo((props: SuspendProps) => {
  const {activeElement: parentActiveElement, children} = props;
  const childrenArr = Array.isArray(children) ? children : [children];

  if (!isEachChildHasUniqueId(children)) {
    throw new Error('Suspend\'s children must have unique ids');
  }

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
  useEffect(() => {
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

  // Select which children should be mounted
  const displayElements = childrenArr.map(c => {
    const {keepMounted, keepMountedAfterSuspend, id} = c.props;
    const isActive = id === activeElement;
    const wasMountedBefore = mountedElements.includes(id);

    return cloneElement<SuspendableOptionalProps>(c, {
      ...c.props,
      isSuspended: !isActive,
      wasMountedBefore,
      keepMounted,
      keepMountedAfterSuspend,
      componentType: !isActive && lastPoped !== id
        ? undefined
        : (lastHistoryAction === 'push'
            ? (lastPoped === id ? 'main' : 'alternative')
            : (lastPoped === id ? 'alternative' : 'main')
        ),
    });
  });

  return <>{displayElements}</>;
});
