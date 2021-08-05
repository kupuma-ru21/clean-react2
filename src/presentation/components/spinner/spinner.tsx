import React from 'react';
import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & { isNegative?: boolean };

const Spinner: React.VFC<Props> = ({ isNegative, ...rest }: Props) => {
  const negativeClass = isNegative ? Styles.negative : '';
  return (
    <div
      {...rest}
      className={[Styles.spinner, negativeClass, rest.className].join(' ')}
      data-testid="spinner"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
