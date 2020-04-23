import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';

import {ButtonSection} from '../_presentation-sections/ButtonSection';

import useActions from '../../hooks/useActions';
import useSelector from '../../hooks/useSelector';
import {configActions} from '../../redux/reducers/config';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

/**
 * Visual entry of application
 * @type {React.NamedExoticComponent<object>}
 */
export const App = memo(() => {
  const mc = useStyles();
  const updateTheme = useActions(configActions.updateTheme);
  const theme = useSelector(state => state.config.scheme);
  const onThemeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateTheme(event.target.value as AppearanceSchemeType);
    }, [updateTheme],
  );

  return (
    <div className={mc.root}>
      <select value={theme} onChange={onThemeChange}>
        <option value={'bright_light'}>bright_light</option>
        <option value={'space_gray'}>space_gray</option>
      </select>
      <ButtonSection/>
    </div>
  );
});
