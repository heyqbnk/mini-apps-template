import {useMemo} from 'react'
import {bindActionCreators, ActionCreator, ActionCreatorsMapObject} from 'redux'
import {useDispatch} from 'react-redux'

type TActions = ActionCreatorsMapObject<any> | ActionCreator<any>;

/**
 * Binds passed action creators to current dispatch.
 * @param actions
 */
function useActions<C extends TActions>(
  actions: C,
): C {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions as any, dispatch),
    [actions, dispatch],
  );
}

export default useActions;
