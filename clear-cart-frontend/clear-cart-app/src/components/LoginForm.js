import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  Container,
  Center,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { cache } from '../apolloClient';
import { CURRENT_USER } from '../graphql/queries';

export default function LoginForm({ switchToSignup }) {
  // const navigate = useNavigate();

  const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.login) {
        cache.writeQuery({
          query: CURRENT_USER,
          variables: { username: data.login.username, password: '' },
          data: { currentUser: data.login },
        });

        notifications.show({
          title: 'Login Successful',
          message: `Welcome ${data.login.fullName || data.login.username}!`,
          color: 'green',
        });
        
      }
    },
    onError: (err) => {
      notifications.show({
        title: 'Login Failed',
        message: err.message || 'Login error',
        color: 'red',
      });
    },
  });

  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: (v) => (v ? null : 'Email is required'),
      password: (v) => (v ? null : 'Password is required'),
    },
  });

  return (
    <Center style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        style={{ backgroundColor: 'white' }}
      >
        <Stack spacing="xs" align="center">
          <Title order={2} style={{ fontWeight: 700 }}>
            SIGN IN
          </Title>
        </Stack>

        <form onSubmit={form.onSubmit((values) => login({ variables: values }))}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            mt="md"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            LOGIN
          </Button>
        </form>

        <Text align="center" mt="md">
          Don't have an account?{' '}
          <Anchor onClick={switchToSignup} style={{ cursor: 'pointer' }}>
            Signup
          </Anchor>
        </Text>
      </Paper>
    </Center>
  );
}