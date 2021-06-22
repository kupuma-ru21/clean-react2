import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submit = getByTestId('submit') as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
  });
});
