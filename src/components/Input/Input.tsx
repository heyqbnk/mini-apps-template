import React, {
  memo,
  useCallback,
  useState,
  useMemo,
  useEffect,
  FocusEvent,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';
import {Theme, InputTheme} from '../../theme';

import {FormControl} from '../FormControl';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

interface UseStylesProps extends Props {
  theme: InputTheme;
}

// TODO: Differs a bit with Android version
const useStyles = makeStyles<Theme, UseStylesProps>(() => ({
  root: {
    position: 'relative',
  },
  input: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    appearance: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    boxSizing: 'border-box',
    padding: '13px 12px',
    color: ({theme}) => theme.colors.foreground,
    '-webkit-appearance': 'none',
    width: '100%',

    '&:focus, &:active': {
      outline: 'none',
    }
  },
  placeholder: {
    position: 'absolute',
    left: 12,
    top: 13,
    color: ({theme}) => theme.colors.placeholder,
  },
}), {name: 'Input'});

export const Input = memo((props: Props) => {
  const {
    className, placeholder, value, onFocus, onBlur, onChange, ...rest
  } = props;
  const theme = useTheme<Theme>();
  const mc = useStyles({...props, theme: theme.components.Select});

  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');
  const isControlled = useMemo(() => value !== undefined, [value]);

  // Rewire onFocus event
  const _onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);

    // Dont forget to call passed onFocus event
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  // Rewire onBlur event
  const _onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  // Rewire onChange event
  const _onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // If component is not controlled, change internal value by ourselves
    if (!isControlled) {
      setCurrentValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  }, [onChange, isControlled]);

  // When value was changed from outside, set internal value
  useEffect(() => {
    setCurrentValue(value === undefined ? '' : value);
  }, [value]);

  return (
    <FormControl className={c(mc.root, className)} isFocused={isFocused}>
      <input
        className={mc.input}
        onFocus={_onFocus}
        onBlur={_onBlur}
        onChange={_onChange}
        value={currentValue}
        {...rest}
      />
      {currentValue === '' && !isFocused && placeholder !== undefined &&
      <div className={mc.placeholder}>{placeholder}</div>}
    </FormControl>
  );
});
