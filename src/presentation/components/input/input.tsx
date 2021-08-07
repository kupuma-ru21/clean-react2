import React, { useRef } from 'react';
import Styles from './input-styles.scss';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = InputProps & { state: any; setState: any };

const Input: React.VFC<Props> = ({ state, setState, ...rest }: Props) => {
  const error = state[`${rest.name}Error`];

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${rest.name}-wrap`}
    >
      <input
        data-testid={rest.name}
        title={error}
        {...rest}
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false;
        }}
        onChange={(e) => {
          setState({ ...state, [e.target.name]: e.target.value });
        }}
        placeholder=" "
        ref={inputRef}
      />
      <label
        data-testid={`${rest.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
        title={error}
      >
        {rest.placeholder}
      </label>
    </div>
  );
};

export default Input;
