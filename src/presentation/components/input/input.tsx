import React, { useContext, useRef } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/context/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.VFC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        data-testid={props.name}
        title={error}
        {...props}
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
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
