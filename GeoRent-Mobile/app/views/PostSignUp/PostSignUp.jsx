import React from 'react';
import { useRoute } from '@react-navigation/native';
import { ResendEmail } from '../../components/ResendEmail/ResendEmail';

export function PostSignUp() {
  const route = useRoute();
  const { email } = route.params;

  return <ResendEmail email={email} isLogin={false} />;
}
