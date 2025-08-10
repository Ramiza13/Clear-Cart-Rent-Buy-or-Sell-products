import React from 'react';
import { cache } from '../apolloClient';
import { CURRENT_USER } from '../graphql/queries';

export default function LogoutButton() {
  const handleLogout = () => {
    cache.writeQuery({
      query: CURRENT_USER,
      data: { currentUser: null },
    });
    cache.reset(); // optional: clears all queries
  };

  return <button onClick={handleLogout}>Logout</button>;
}