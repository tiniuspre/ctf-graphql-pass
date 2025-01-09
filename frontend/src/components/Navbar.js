// src/components/Navbar.js
import React, { useContext } from 'react';
import { Flex, Box, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <Flex bg="teal.500" p={4} color="white">
      <Box>
        <Link as={RouterLink} to="/" mr={4}>
          Home
        </Link>
        {auth?.token && (
          <Link as={RouterLink} to="/profile" mr={4}>
            Profile
          </Link>
        )}
      </Box>
      <Spacer />
      <Box>
        {auth?.token ? (
          <LogoutButton />
        ) : (
          <>
            <Link as={RouterLink} to="/login" mr={4}>
              Login
            </Link>
            <Link as={RouterLink} to="/register">
              Register
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default Navbar;
