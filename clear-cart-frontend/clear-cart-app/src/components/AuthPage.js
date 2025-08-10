import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Container } from '@mantine/core';

export default function AuthPage() {
  const [view, setView] = useState('login'); // 'login' or 'signup'

  return (
    <Container size="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {view === 'login' ? (
        <LoginForm switchToSignup={() => setView('signup')} />
      ) : (
        <SignupForm switchToLogin={() => setView('login')} />
      )}
    </Container>
  );
}