import React, {memo} from 'react';

import {PresentationSection} from './PresentationSection';
import {PresentationSectionItem} from './PresentationSectionItem';
import {PresentationTitle} from './PresentationTitle';
import {PresentationSubtitle} from './PresentationSubtitle';
import {Select} from '../Select';

export const SelectSection = memo(() => {
  return (
    <PresentationSection>
      <PresentationTitle>Select</PresentationTitle>
      <PresentationSectionItem>
        <PresentationSubtitle>Example</PresentationSubtitle>
        <Select placeholder={'Select gender'}>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </Select>
      </PresentationSectionItem>
    </PresentationSection>
  );
});
