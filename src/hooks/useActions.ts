import {useMemo} from 'react';
import {bindActionCreators, ActionCreator, ActionCreatorsMapObject} from 'redux';
import {useDispatch} from 'react-redux';

type Actions = ActionCreatorsMapObject<any> | ActionCreator<any>;

/**
 * Binds dispatch to functions
 * @param actions
 */
export function useActions<C extends Actions>(actions: C): C {
  const dispatch = useDispatch();
  const actionsDeps = typeof actions === 'object'
    ? Object.values(actions)
    : [actions];

  return useMemo(
    () => bindActionCreators(actions as any, dispatch),
    // eslint-disable-next-line
    [...actionsDeps, dispatch],
  );
}
