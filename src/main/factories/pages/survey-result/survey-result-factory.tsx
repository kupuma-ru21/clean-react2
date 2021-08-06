import React from 'react';
import { useParams } from 'react-router-dom';
import { SurveyResult } from '@/presentation/pages';
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases';

export const MakeSurveyResult: React.VFC = () => {
  const { id }: any = useParams();
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />;
};
