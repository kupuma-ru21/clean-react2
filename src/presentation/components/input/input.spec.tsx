import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import faker from 'faker';
import Context from '@/presentation/context/form/form-context';
import Input from './input';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );
};

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });

  it('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBeFalsy();
  });

  it('Should focus input on label click', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field);
    const label = sut.getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
