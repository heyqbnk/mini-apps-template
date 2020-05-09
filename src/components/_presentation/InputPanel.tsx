import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../ui/PanelHeader';
import {Subtitle} from './Subtitle';
import {Input} from '../ui/Input';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const InputPanel = memo(function InputPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>Input</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <Subtitle>Example</Subtitle>
        <Input placeholder={'Your name'}/>
      </div>
    </>
  );
});

