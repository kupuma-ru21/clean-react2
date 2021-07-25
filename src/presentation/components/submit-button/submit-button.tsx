import React, { useContext } from 'react';
import { FormContext } from '@/presentation/context';

type Props = { text: string };

const SubmitButton: React.VFC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext);

  return (
    <button disabled={state.isFormInvalid} type="submit" data-testid="submit">
      {text}
    </button>
  );
};

export default SubmitButton;
