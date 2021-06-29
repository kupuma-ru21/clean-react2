import React, { useContext } from 'react';
import Context from '@/presentation/context/form/form-context';

type Props = { text: string };

const SubmitButton: React.VFC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context);

  return (
    <button disabled={state.isFormInvalid} type="submit" data-testid="submit">
      {text}
    </button>
  );
};

export default SubmitButton;
