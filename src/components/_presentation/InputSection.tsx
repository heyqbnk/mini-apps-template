import React, {memo} from 'react';

import {PresentationSection} from './PresentationSection';
import {PresentationSectionItem} from './PresentationSectionItem';
import {PresentationTitle} from './PresentationTitle';
import {PresentationSubtitle} from './PresentationSubtitle';
import {Input} from '../Input';

export const InputSection = memo(() => {
  return (
    <PresentationSection>
      <PresentationTitle>Input</PresentationTitle>
      <PresentationSectionItem>
        <PresentationSubtitle>Example</PresentationSubtitle>
        <Input placeholder={'You name'}/>
      </PresentationSectionItem>
    </PresentationSection>
  );
});
