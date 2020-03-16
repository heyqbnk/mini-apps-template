import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {StorageField, StorageValuesMap} from '../../types/bridge';

export type StorageReducerState = {
  [F in StorageField]?: StorageValuesMap[F]
};

export const storageActions = unionize({
  memoize: ofType<{ [F in StorageField]?: StorageValuesMap[F] }>(),
  dropAllValues: {},
}, unionizeConfig);

type StorageAction = UnionOf<typeof storageActions>;

const initialState: StorageReducerState = {};

function storageReducer(
  state: StorageReducerState = initialState,
  action: StorageAction,
) {
  return storageActions.match(action, {
    memoize: memo => ({...state, ...memo}),
    dropAllValues: () => ({}),
    default: () => state,
  });
}

export default storageReducer;
