// src/pages/Login.js
import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      errors
      token
      refreshToken
    }
  }
`;

function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tokenAuth, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.tokenAuth.success) {
        login(data.tokenAuth.token);
        navigate('/profile');
      } else {
        console.log('Login errors:', data.tokenAuth.errors);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    tokenAuth({ variables: formState });
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6}>Login</Heading>
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
        <FormControl id="password" mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
        </FormControl>
        {error && <Text color="red.500">{error.message}</Text>}
        {data && data.tokenAuth.errors && (
          <Text color="red.500">
            {JSON.stringify(data.tokenAuth.errors, null, 2)}
          </Text>
        )}
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
