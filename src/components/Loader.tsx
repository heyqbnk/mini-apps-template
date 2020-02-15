import React, {memo} from 'react';

import makeStyles from '@material-ui/styles/makeStyles/makeStyles';

interface IProps {
  size?: number;
}

const useStyles = makeStyles<{}, IProps>({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: ({size}) => size ? size : 44,
    height: ({size}) => size ? size : 44,
    animation: '$spin 1s linear infinite',
    color: '#aeb7c2',
  },
  '@keyframes spin': {
    from: {transform: 'rotate(0deg)'},
    to: {transform: 'rotate(360deg)'},
  },
});

const Loader = memo((props: IProps) => {
  const mc = useStyles(props);

  return (
    <div className={mc.root}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 44 44'
        className={mc.spinner}
      >
        <path
          // eslint-disable-next-line max-len
          d='M22 44a1.5 1.5 0 0 1 0-3c10.493 0 19-8.507 19-19S32.493 3 22 3 3 11.507 3 22c0 2.208.376 4.363 1.103 6.397a1.5 1.5 0 1 1-2.825 1.01A21.964 21.964 0 0 1 0 22C0 9.85 9.85 0 22 0s22 9.85 22 22-9.85 22-22 22z'
          fill='currentColor'
          fillRule='nonzero'
        />
      </svg>
    </div>
  );
});

export default Loader;
