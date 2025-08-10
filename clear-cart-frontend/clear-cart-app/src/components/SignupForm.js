import React from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Anchor,
  Container,
  Group,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function SignupForm({ switchToLogin }) {
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      notifications.show({
        title: 'Registration Successful',
        message: 'Your account has been created. You can now log in.',
        color: 'green',
      });
      // switchToLogin?.(); // optionally switch to login form automatically
      switchToLogin();
    },
    onError: (err) => {
      notifications.show({
        title: 'Registration Failed',
        message: err.message || 'An error occurred during registration',
        color: 'red',
      });
    },
  });

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) =>
        v.length >= 6 ? null : 'Password must be at least 6 characters',
      confirmPassword: (v, values) =>
        v === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = (values) => {
    registerUser({
      variables: {
        username: values.email,
        password: values.password,
        email: values.email,
        fullName: `${values.firstName} ${values.lastName}`,
        phone: values.phone,
      },
    });
  };

  return (
    <Container size={500} my={80}>
      <Title align="center" style={{ fontWeight: 700 }}>
        SIGN UP
      </Title>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        style={{ backgroundColor: 'white' }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="First Name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            label="Email"
            placeholder="Your email"
            mt="md"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            mt="md"
            {...form.getInputProps('phone')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            REGISTER
          </Button>
        </form>

        <Text align="center" mt="md">
          Already have an account?{' '}
          <Anchor onClick={switchToLogin} style={{ cursor: 'pointer' }}>
            Sign In
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}