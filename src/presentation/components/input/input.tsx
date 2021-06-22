import React, { useCallback, useContext, useMemo } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/context/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.VFC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const enableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>): void => {
      event.target.readOnly = false;
    },
    []
  );
  const getStatus = useMemo((): string => {
    return '🔴';
  }, []);
  const getTitle = useMemo((): string => {
    return error;
  }, [error]);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((oldState) => {
        return { ...oldState, [event.target.name]: event.target.value };
      });
    },
    [setState]
  );

  return (
    <div className={Styles.inputWrap}>
      <input
        data-testid={props.name}
        {...props}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle}
        className={Styles.status}
      >
        {getStatus}
      </span>
    </div>
  );
};

export default Input;
