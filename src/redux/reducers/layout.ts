import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';

export interface LayoutReducerState {
  /**
   * Текущая активная модалка.
   */
  activeModal: string | null;
}

export const layoutActions = unionize({
  // Задает активную модалку.
  setActiveModal: ofType<string>(),
}, unionizeConfig);

type LayoutAction = UnionOf<typeof layoutActions>;

const initialState: LayoutReducerState = {
  activeModal: null,
};

/**
 * Редьюсер который отвечает за визуальную сосотовляющую приложения.
 * @param {StorageReducerState} state
 * @param {StorageAction} action
 * @returns {string[]}
 */
function layoutReducer(
  state: LayoutReducerState = initialState,
  action: LayoutAction,
) {
  return layoutActions.match(action, {
    setActiveModal: modalId => ({...state, activeModal: modalId}),
    default: () => state,
  });
}

export default layoutReducer;
