import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../PanelHeader';
import {Subtitle} from './Subtitle';
import {Input} from '../Input';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const InputPanel = memo(() => {
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

