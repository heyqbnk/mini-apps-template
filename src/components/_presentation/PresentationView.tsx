import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';

import {ButtonSection} from './ButtonSection';
import {SelectSection} from './SelectSection';

import useActions from '../../hooks/useActions';
import {useSelector} from '../../hooks/useSelector';
import {deviceActions} from '../../redux/reducers/device';
import {appConfigActions} from '../../redux/reducers/app-config';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {OS} from '../../types';

const useStyles = makeStyles({
  root: {
    padding: '60px 18px 18px',
  },
  select: {
    marginBottom: 20,

    '& + &': {
      marginLeft: 15,
    },
  },
});

export const PresentationView = memo(() => {
  const mc = useStyles();
  const {updateAppearanceScheme, setOS} = useActions({
    updateAppearanceScheme: appConfigActions.updateAppearanceScheme,
    setOS: deviceActions.setOS,
  });
  const {scheme, os} = useSelector(state => ({
    scheme: state.appConfig.scheme,
    os: state.device.os,
  }));
  const onThemeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateAppearanceScheme(event.target.value as AppearanceSchemeType);
    }, [updateAppearanceScheme],
  );
  const onOSChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setOS(parseInt(event.target.value) as OS);
    }, [setOS],
  );

  return (
    <div className={mc.root}>
      <select className={mc.select} value={scheme} onChange={onThemeChange}>
        <option value={'bright_light'}>bright_light</option>
        <option value={'space_gray'}>space_gray</option>
      </select>
      <select className={mc.select} value={os} onChange={onOSChange}>
        <option value={OS.IOS}>IOS</option>
        <option value={OS.Android}>Android</option>
      </select>
      <ButtonSection/>
      <SelectSection/>
    </div>
  );
});
