import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {Insets} from '../../types';

export interface LayoutReducerState {
  /**
   * Initial device insets. Not changing during application lifetime
   */
  insets: Insets;
  /**
   * Current device insets. Changing during application lifetime. For example,
   * when virtual keyboard is being opened
   */
  currentInsets: Insets;
}

export const layoutActions = unionize({
  setCurrentInsets: ofType<Insets>(),
}, unionizeConfig);

type LayoutAction = UnionOf<typeof layoutActions>;

const initialState: LayoutReducerState = {
  insets: {top: 0, bottom: 0, left: 0, right: 0},
  currentInsets: {top: 0, bottom: 0, left: 0, right: 0},
};

/**
 * Responsible for things connected with visual state
 * @param {StorageReducerState} state
 * @param action
 * @returns {string[]}
 */
function layoutReducer(
  state: LayoutReducerState = initialState,
  action: LayoutAction,
) {
  return layoutActions.match(action, {
    setCurrentInsets: insets => ({...state, currentInsets: insets}),
    default: () => state,
  });
}

export default layoutReducer;
