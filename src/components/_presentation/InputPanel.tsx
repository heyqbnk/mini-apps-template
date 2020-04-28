import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../PanelHeader';
import {Subtitle} from './Subtitle';
import {Input} from '../Input';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: '0 18px',
  },
});

export const InputPanel = memo(() => {
  const mc = useStyles();

  return (
    <>
      <PanelHeader>Select</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <Subtitle>Example</Subtitle>
        <Input placeholder={'You name'}/>
      </div>
    </>
  );
});

