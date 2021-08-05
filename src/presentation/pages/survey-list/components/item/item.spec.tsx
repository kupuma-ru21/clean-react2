import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockSurveyModel } from '@/domain/test';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { IconName } from '@/presentation/components';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: true };
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('Should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: false };
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
