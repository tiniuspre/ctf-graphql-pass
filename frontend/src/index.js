// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './AuthContext';
import client from './apolloClient';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
