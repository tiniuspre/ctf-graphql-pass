// src/components/LogoutButton.js
import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; // Ensure correct import

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // This hook now has access to router context

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
}

export default LogoutButton;
