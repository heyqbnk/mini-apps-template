import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {StorageField, StorageValuesMap} from '../../types';

export type StorageReducerState = {
  [F in StorageField]?: StorageValuesMap[F]
};

export const storageActions = unionize({
  memoize: ofType<{ [F in StorageField]?: StorageValuesMap[F] }>(),
  dropAllValues: {},
}, unionizeConfig);

type StorageAction = UnionOf<typeof storageActions>;

const initialState: StorageReducerState = {};

/**
 * Responsible for memoizing values from VKontakte storage
 * @param {StorageReducerState} state
 * @param {StorageAction} action
 * @returns {unknown}
 */
export function storageReducer(
  state: StorageReducerState = initialState,
  action: StorageAction,
) {
  return storageActions.match(action, {
    memoize: memo => ({...state, ...memo}),
    dropAllValues: () => ({}),
    default: () => state,
  });
}
