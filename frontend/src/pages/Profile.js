// src/pages/Profile.js
import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const PROFILE_QUERY = gql`
  query {
    me {
      id
      username
      email
      secretNote
    }
  }
`;

function Profile() {
  const { token } = useContext(AuthContext);

  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={10} textAlign="center">
        <Text color="red.500">Error: {error.message}</Text>
      </Box>
    );
  }

  const { username, email, secretNote } = data.me;

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6}>Profile</Heading>
      <Text>Username: {username}</Text>
      <Text>Email: {email}</Text>
      <Text>Secret: {secretNote}</Text>

    </Box>
  );
}

export default Profile;
