import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import client, { cache } from './apolloClient';

import { CURRENT_USER } from './graphql/queries';

cache.writeQuery({
  query: CURRENT_USER,
  data: { currentUser: null },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <ApolloProvider client={client}>
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
        primaryColor: 'indigo',
        radius: { md: '10px' },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <Notifications position="top-right" zIndex={2077} />
        <App />
      </ModalsProvider>

    </MantineProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
