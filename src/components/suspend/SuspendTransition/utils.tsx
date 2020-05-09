import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../../theme/types';

import {SuspendTransition} from './SuspendTransition';

import {setBodyOverflow} from '../../../utils';
import {useDevice} from '../../providers/DeviceProvider';

import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {SuspendComponentType} from '../Suspend';
import {
  CreateTransitionComponentOptions,
  CustomTransitionContext, CustomTransitionProps,
} from './types';
import {OS} from '../../../types';

/**
 * Creates CSSTransition handlers
 * @param {SuspendComponentType} componentType
 * @param {EnterHandler} onEnter
 * @param {EnterHandler} onEntered
 * @param {ExitHandler} onExit
 * @param {ExitHandler} onExited
 * @returns {{onEnter: (node: HTMLElement, isAppearing: boolean) => void; onExit: (node: HTMLElement) => void; onExited: (node: HTMLElement) => void; onEntered: (node: HTMLElement, isAppearing: boolean) => void}}
 */
export function useTransitionHandlers(
  componentType: SuspendComponentType,
  onEnter?: EnterHandler,
  onEntered?: EnterHandler,
  onExit?: ExitHandler,
  onExited?: ExitHandler,
) {
  // Restricts body overflow only in case if called in context of
  // alternative component to avoid collisions with main components. 
  // Alternative is chosen because most of the time the are the reason
  // of body overflow
  const hideBodyOverflow = useCallback(() => {
    if (componentType === 'alternative') {
      setBodyOverflow(false);
    }
  }, [componentType]);

  // Restores body overflow
  const showBodyOverflow = useCallback(() => {
    if (componentType === 'alternative') {
      setBodyOverflow(true);
    }
  }, [componentType]);

  const _onEnter = useCallback<EnterHandler>((node, isAppearing) => {
    hideBodyOverflow();

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  }, [onEnter, hideBodyOverflow]);

  const _onEntered = useCallback<EnterHandler>((node, isAppearing) => {
    showBodyOverflow();

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  }, [onEntered, showBodyOverflow]);

  const _onExit = useCallback<ExitHandler>(node => {
    hideBodyOverflow();

    if (onExit) {
      onExit(node);
    }
  }, [onExit, hideBodyOverflow]);

  const _onExited = useCallback<ExitHandler>(node => {
    showBodyOverflow();

    if (onExited) {
      onExited(node);
    }
  }, [onExited, showBodyOverflow]);

  return {
    onEnter: _onEnter,
    onEntered: _onEntered,
    onExit: _onExit,
    onExited: _onExited,
  };
}

/**
 * Creates custom transition
 * @param {CreateTransitionComponentOptions} options
 * @returns {{Component: React.NamedExoticComponent<Props>; useContext: () => Context}}
 */
export function createCustomTransition(options: CreateTransitionComponentOptions) {
  interface UseStylesProps {
    componentType: SuspendComponentType;
    os: OS;
  }

  const {
    displayName, createActivePhaseTransitionHandler,
    createStartPhaseTransitionHandler, iosTransitionDuration,
    androidTransitionDuration,
  } = options;

  const useStyles = makeStyles<Theme, UseStylesProps>(
    theme => ({
      enter: createStartPhaseTransitionHandler(theme, 'enter'),
      enterActive: createActivePhaseTransitionHandler(theme, 'enter'),
      exit: createStartPhaseTransitionHandler(theme, 'exit'),
      exitActive: createActivePhaseTransitionHandler(theme, 'exit'),
      exitDone: {display: 'none'},
    }), {name: displayName},
  );

  const context = createContext<CustomTransitionContext>({
    isSuspended: false,
    wasMountedBefore: false,
    componentType: 'main',
    keepMounted: false,
    keepMountedAfterSuspend: false,
    isTransitioning: false,
  });

  const {Provider} = context;

  const Component = function (props: CustomTransitionProps) {
    const {
      componentType, children, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend,
    } = props;
    const {os} = useDevice();
    const mc = useStyles({...props, os, componentType});

    const [isTransitioning, setIsTransitioning] = useState(false);

    const contextValue = useMemo<CustomTransitionContext>(() => ({
      componentType,
      isSuspended,
      wasMountedBefore,
      keepMounted,
      keepMountedAfterSuspend,
      isTransitioning,
    }), [
      componentType, isSuspended, wasMountedBefore, keepMounted,
      keepMountedAfterSuspend, isTransitioning,
    ]);

    const onEnter = useCallback(() => setIsTransitioning(true), []);
    const onEntered = useCallback(() => setIsTransitioning(false), []);
    const onExit = useCallback(() => setIsTransitioning(true), []);
    const onExited = useCallback(() => setIsTransitioning(false), []);

    return (
      <Provider value={contextValue}>
        <SuspendTransition
          {...props}
          classNames={mc}
          androidTransitionDuration={androidTransitionDuration}
          iosTransitionDuration={iosTransitionDuration}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={onExited}
        >
          {children}
        </SuspendTransition>
      </Provider>
    );
  };

  // Assign human-readable component name
  Object.defineProperty(Component, 'name', {value: displayName});

  return {
    Component: memo(Component),
    useContext: () => useContext(context),
  };
}
