import React, {
  memo,
  SelectHTMLAttributes,
  useCallback,
  useState,
  useMemo,
  useEffect,
  FocusEvent,
  ChangeEvent,
  Children,
} from 'react';
import c from 'classnames';

import {makeStyles, useTheme} from '@material-ui/styles';
import {Theme, SelectTheme} from '../../theme';

import {FormControl} from '../FormControl';

import {ReactComponent as ArrowDownSvg} from '../../assets/arrow-down.svg';

import {isOptionWithValue} from './utils';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
}

interface UseStylesProps extends Props {
  theme: SelectTheme;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    padding: '13px 40px 13px 12px',
    position: 'relative',
  },
  select: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  title: {
    color: ({theme}) => theme.colors.foreground,
  },
  arrow: {
    color: ({theme}) => theme.colors.icon,
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 24,
    zIndex: 0,
  },
  placeholder: {
    color: ({theme}) => theme.colors.placeholder,
  },
}), {name: 'Select'});

export const Select = memo((props: Props) => {
  const {
    className, children, placeholder, value, onFocus, onBlur, onChange, ...rest
  } = props;
  const theme = useTheme<Theme>();
  const mc = useStyles({...props, theme: theme.components.Select});

  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');
  const isControlled = useMemo(() => value !== undefined, [value]);

  const title = useMemo(() => {
    const option = Children
      .toArray(children)
      .find(isOptionWithValue(currentValue));

    return option
      ? (typeof option.props.children === 'string' ? option.props.children : '')
      : null;
  }, [currentValue, children]);

  // Rewire onFocus event
  const _onFocus = useCallback((e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);

    // Dont forget to call passed onFocus event
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  // Rewire onBlur event
  const _onBlur = useCallback((e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);

    // Dont forget to call passed onFocus event
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  // Rewire onChange event
  const _onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
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
      <select
        className={mc.select}
        onFocus={_onFocus}
        onBlur={_onBlur}
        onChange={_onChange}
        value={currentValue}
        {...rest}
      >
        {placeholder && <option value={''}>{placeholder}</option>}
        {children}
      </select>
      {currentValue === '' && placeholder !== undefined &&
      <div className={mc.placeholder}>{placeholder}</div>}
      {title !== null && <div className={mc.title}>{title}</div>}
      <ArrowDownSvg className={mc.arrow}/>
    </FormControl>
  );
});
