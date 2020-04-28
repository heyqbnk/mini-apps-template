import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../PanelHeader';
import {Subtitle} from './Subtitle';
import {Select} from '../Select';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: '0 18px',
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

export const SelectPanel = memo(() => {
  const mc = useStyles();

  return (
    <>
      <PanelHeader>Select</PanelHeader>
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
