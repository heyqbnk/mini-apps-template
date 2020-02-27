import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {EStorageField, IStorageValuesMap} from '../../types/bridge';

export type TStorageReducerState = {
  [F in EStorageField]?: IStorageValuesMap[F]
};

export const storageActions = unionize({
  memoize: ofType<{ [F in EStorageField]?: IStorageValuesMap[F] }>(),
}, unionizeConfig);

type TStorageAction = UnionOf<typeof storageActions>;

const initialState: TStorageReducerState = {};

function storageReducer(
  state: TStorageReducerState = initialState,
  action: TStorageAction,
) {
  return storageActions.match(action, {
    memoize: memo => ({...state, ...memo}),
    default: () => state,
  });
}

export default storageReducer;
