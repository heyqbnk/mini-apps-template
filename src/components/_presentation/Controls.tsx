import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme/types';

import {useTheme} from '../providers/ThemeProvider';
import {useDevice} from '../providers/DeviceProvider';

import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {OS} from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 20,
  },
  select: {
    marginBottom: 15,

    '& + &': {
      marginLeft: 15,
    },
  },
  note: {
    display: 'block',
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
}));

export const Controls = memo(function Controls() {
  const mc = useStyles();
  const {scheme, setScheme} = useTheme();
  const {os, setOS} = useDevice();
  const onThemeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setScheme(event.target.value as AppearanceSchemeType);
    }, [setScheme],
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
      <i className={mc.note}>
        NOTE: Stable work while changing OS is not guaranteed
      </i>
    </div>
  );
});
