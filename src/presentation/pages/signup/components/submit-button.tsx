import React from 'react';
import { useRecoilValue } from 'recoil';
import { SubmitButtonBase } from '@/presentation/components';
import { signUpState } from './atoms';

type Props = { text: string };

const SubmitButton: React.VFC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(signUpState);

  return <SubmitButtonBase text={text} state={state} />;
};

export default SubmitButton;
