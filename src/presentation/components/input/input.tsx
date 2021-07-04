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
    <div className={Styles.inputWrap}>
      <input
        data-testid={props.name}
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
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || '認証に成功'}
        className={Styles.status}
      >
        {error ? '🔴' : '🔵'}
      </span>
    </div>
  );
};

export default Input;
