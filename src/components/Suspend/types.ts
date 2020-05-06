import {ReactElement} from 'react';

/**
 * Type of suspend component
 */
export type SuspendComponentType = 'main' | 'alternative';

/**
 * Last history action
 */
export type SuspendLastHistoryActionType = 'push' | 'pop';

export interface SuspendableOptionalProps {
  /**
   * Means that component is currently suspended (not active)
   */
  isSuspended?: boolean;
  /**
   * States if component was mounted earlier
   */
  wasMountedBefore?: boolean;
  /**
   * Guarantees that component is always mounted until its parent is unmounted.
   *
   * To detect, if component is currently active, use "isSuspended" prop
   */
  keepMounted?: boolean;
  /**
   * Makes component stay in React tree after it became suspended. It means,
   * component will not call methods like componentWillUnmount or something
   * like this, because naturally, it will not be unmounted. If false,
   * component will be unmounted and mounted again when becomes active and
   * so, all onmount handlers will be called.
   *
   * This feature is required when you don't want to call some handlers each
   * time component mounts.
   *
   * To detect, if component is currently active, use "isSuspended" prop
   */
  keepMountedAfterSuspend?: boolean;
  /**
   * Current transition animation type
   */
  componentType?: SuspendComponentType;
}

export interface SuspendableComponentProps extends SuspendableOptionalProps {
  /**
   * Element unique identifier
   */
  id: string;
  /**
   * Children which can optionally support passed props by Suspend
   */
  children?:
    | ReactElement<SuspendableOptionalProps>
    | ReactElement<SuspendableOptionalProps>[];
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
    | ReactElement<SuspendableComponentProps>
    | ReactElement<SuspendableComponentProps>[];
}
