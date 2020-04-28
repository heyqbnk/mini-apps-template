import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';

import {useActions, useSelector} from '../../hooks';
import {deviceActions, appConfigActions} from '../../redux/reducers';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {OS} from '../../types';

const useStyles = makeStyles({
  select: {
    marginBottom: 20,

    '& + &': {
      marginLeft: 15,
    },
  },
});

export const Controls = memo(() => {
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
    <div>
      <select className={mc.select} value={scheme} onChange={onThemeChange}>
        <option value={'bright_light'}>bright_light</option>
        <option value={'space_gray'}>space_gray</option>
      </select>
      <select className={mc.select} value={os} onChange={onOSChange}>
        <option value={OS.IOS}>IOS</option>
        <option value={OS.Android}>Android</option>
      </select>
    </div>
  );
});
