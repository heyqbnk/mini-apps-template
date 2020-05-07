import React, {
  memo,
  useCallback,
  useState,
  useMemo,
  useEffect,
  FocusEvent,
  ChangeEvent,
} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../../theme';

import {FormControl} from '../FormControl';

import {InputProps} from './types';

const useStyles = makeStyles<Theme, InputProps>(theme => {
  const {foregroundColor, placeholderColor} = theme.components.Input;

  return {
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
      padding: '11.5px 12px',
      color: foregroundColor,
      '-webkit-appearance': 'none',
      width: '100%',

      '&:focus, &:active': {
        outline: 'none',
      },
    },
    placeholder: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 12,
      color: placeholderColor,
    },
  };
}, {name: 'Input'});

export const Input = memo((props: InputProps) => {
  const {
    className, placeholder, value, onFocus, onBlur, onChange, ...rest
  } = props;
  const mc = useStyles(props);

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
    setCurrentValue(value || '');
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
