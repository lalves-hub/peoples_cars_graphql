import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/pages/Home';
import SeeMore from '../src/pages/SeeMore';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/SeeMore/:personId',
    element: <SeeMore />,
  },
]);
function App() {
  return (

    <ApolloProvider client={client}>

      <RouterProvider router={router} />
    </ApolloProvider>

  );
}

export default App;

