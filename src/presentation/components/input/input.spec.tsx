import React from 'react';
import { render } from '@testing-library/react';
import Context from '@/presentation/context/form/form-context';
import Input from './input';

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });
});
