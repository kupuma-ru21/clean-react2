import React from 'react';
import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & { isNegative?: boolean };

const Spinner: React.VFC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? Styles.negative : '';
  return (
    <div
      {...props}
      className={[Styles.spinner, negativeClass, props.className].join(' ')}
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
