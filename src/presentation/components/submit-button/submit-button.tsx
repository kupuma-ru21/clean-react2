import React from 'react';

type Props = { text: string; state: any };

const SubmitButton: React.VFC<Props> = ({ text, state }: Props) => {
  return (
    <button disabled={state.isFormInvalid} type="submit" data-testid="submit">
      {text}
    </button>
  );
};

export default SubmitButton;
