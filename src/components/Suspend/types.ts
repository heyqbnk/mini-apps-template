import {ReactElement} from 'react';

export interface Suspendable {
  /**
   * Means that component is currently suspended (not active)
   */
  isSuspended?: boolean;
}

export interface SuspendableComponent extends Suspendable {
  /**
   * Element unique identifier
   */
  id: string;
  /**
   * Guarantees that component is always mounted until its parent is unmounted
   */
  isAlwaysMounted?: boolean;
  /**
   * Makes component stay in React tree after it became suspended. It means,
   * component will not call methods like componentWillUnmount or something
   * like this, because naturally, it will not be unmounted. If false,
   * component will be unmounted and mounted again when becomes active and
   * so, all onmount handlers will be called.
   *
   * This feature is required when you don't want to call some handlers each
   * time component mounts. To detect, if component is currently active, use
   * "isSuspended" prop
   */
  keepMountedAfterSuspend?: boolean;
}

export interface SuspendProps {
  /**
   * Current active element
   */
  activeElement: string;
  /**
   * List of suspendable items
   */
  children:
    | ReactElement<SuspendableComponent>
    | ReactElement<SuspendableComponent>[];
}
