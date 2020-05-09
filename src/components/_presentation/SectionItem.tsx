import {styled} from '@material-ui/styles';

export const SectionItem = styled('div')({
  '& + &': {
    marginTop: 20,
  },
});

SectionItem.displayName = 'SectionItem';
