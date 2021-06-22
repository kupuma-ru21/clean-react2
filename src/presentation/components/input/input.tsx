import React, { useCallback, useContext, useMemo } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/context/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.VFC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];
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
  }, []);

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
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
