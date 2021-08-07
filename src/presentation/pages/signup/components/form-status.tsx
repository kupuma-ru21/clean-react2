import React from 'react';
import { useRecoilValue } from 'recoil';
import { FormStatusBase } from '@/presentation/components';
import { signUpState } from './atoms';

const FormStatus: React.VFC = () => {
  const state = useRecoilValue(signUpState);

  return <FormStatusBase state={state} />;
};

export default FormStatus;
