import React, {
  memo,
  useEffect,
  useRef,
  ReactElement,
  cloneElement,
} from 'react';

import {makeStyles} from '@material-ui/styles';

import {isEachChildHasUniqueId} from './utils';

import {SuspendProps, SuspendableComponent} from './types';

const useStyles = makeStyles({
  suspended: {
    display: 'none',
  },
}, {name: 'Suspend'});

export const Suspend = memo((props: SuspendProps) => {
  const {activeElement, children} = props;
  const mc = useStyles(props);
  const childrenArr = Array.isArray(children) ? children : [children];

  // Keeps all previously mounted elements
  const mountedElementsRef = useRef<string[]>([]);

  // Add new activeElement to previously mounted elements
  useEffect(() => {
    if (!mountedElementsRef.current.includes(activeElement)) {
      mountedElementsRef.current.push(activeElement);
    }
  }, [activeElement]);

  if (!isEachChildHasUniqueId(children)) {
    throw new Error('SuspendController\'s children must have unique ids');
  }
  // Select which children should be mounted
  const displayElements = childrenArr
    .reduce<ReactElement<SuspendableComponent>[]>((acc, c) => {
      const {isAlwaysMounted, keepMountedAfterSuspend, id} = c.props;
      const isActive = id === activeElement;

      // Display only elements which:
      // 1. Are always mounted
      // 2. Currently active
      // 3. Were mounted before and should be mounted after being suspended
      if (
        isAlwaysMounted
        || isActive
        || (keepMountedAfterSuspend && mountedElementsRef.current.includes(id))
      ) {
        // Set isSuspended prop depending on which element is currently active
        const clone = cloneElement(c, {
          ...c.props,
          isSuspended: !isActive,
          key: id,
        });

        if (isActive) {
          acc.push(clone);
        } else {
          acc.push(<div className={mc.suspended} key={id}>{clone}</div>);
        }
      }
      return acc;
    }, []);

  return <>{displayElements}</>;
});
