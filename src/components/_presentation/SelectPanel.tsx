import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../ui/PanelHeader';
import {Subtitle} from './Subtitle';
import {Select} from '../ui/Select';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
  link: {
    display: 'block',

    '& + &': {
      marginTop: 10,
    },
  },
  item: {
    '& + &': {
      marginTop: 15,
    },
  },
});

export const SelectPanel = memo(function SelectPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>Select</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <Subtitle>Example</Subtitle>
        <Select placeholder={'Select gender'}>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </Select>
      </div>
    </>
  );
});

