import {unionize} from 'unionize';
import {unionizeConfig} from '../utils';

export interface LayoutReducerState {
}

export const layoutActions = unionize({
}, unionizeConfig);

// type LayoutAction = UnionOf<typeof layoutActions>;

const initialState: LayoutReducerState = {
  activeModal: null,
};

/**
 * Responsible for things connected with visual state
 * @param {StorageReducerState} state
 * @returns {string[]}
 */
function layoutReducer(
  state: LayoutReducerState = initialState,
  // action: LayoutAction,
) {
  return state;
  // return layoutActions.match(action, {
  //   default: () => state,
  // });
}

export default layoutReducer;
