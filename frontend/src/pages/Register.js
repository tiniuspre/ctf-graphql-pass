// src/pages/Register.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

function Register() {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password1: '',
    password2: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      if (data.register.success) {
        // Optionally log the user in automatically
        login(data.register.token);
        navigate('/profile');
      } else {
        // Handle registration errors
        console.log('Registration errors:', data.register.errors);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password1 !== formState.password2) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register({
        variables: formState,
      });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={3} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="username" mb={3} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={formState.username}
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="password1" mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formState.password1}
            onChange={(e) =>
              setFormState({ ...formState, password1: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="password2" mb={3} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={formState.password2}
            onChange={(e) =>
              setFormState({ ...formState, password2: e.target.value })
            }
          />
        </FormControl>
        {error && <Text color="red.500">{error.message}</Text>}
        {data && data.register.errors && (
          <Text color="red.500">
            {JSON.stringify(data.register.errors, null, 2)}
          </Text>
        )}
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
