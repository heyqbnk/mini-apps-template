import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';

import {ButtonSection} from './ButtonSection';

import useActions from '../../hooks/useActions';
import {appConfigActions} from '../../redux/reducers/app-config';
import useSelector from '../../hooks/useSelector';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const PresentationView = memo(() => {
  const mc = useStyles();
  const updateAppearanceScheme =
    useActions(appConfigActions.updateAppearanceScheme);
  const scheme = useSelector(state => state.appConfig.scheme);
  const onThemeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateAppearanceScheme(event.target.value as AppearanceSchemeType);
    }, [updateAppearanceScheme],
  );

  return (
    <div className={mc.root}>
      <select value={scheme} onChange={onThemeChange}>
        <option value={'bright_light'}>bright_light</option>
        <option value={'space_gray'}>space_gray</option>
      </select>
      <ButtonSection/>
    </div>
  );
});
