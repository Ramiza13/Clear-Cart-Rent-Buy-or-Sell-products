import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Group } from '@mantine/core';
import { cache } from '../../apolloClient';
import { CURRENT_USER } from '../../graphql/queries';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on login/signup — hide navbar
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  // Check if logged in from Apollo cache
  const currentUser = cache.readQuery({ query: CURRENT_USER })?.currentUser;

  const handleLogout = () => {
    cache.writeQuery({
      query: CURRENT_USER,
      data: { currentUser: null },
    });
    cache.reset();
    navigate('/login');
  };

  if (hideNavbar || !currentUser) return null;

  return (
    <Group position="apart" p="md" style={{ background: '#f5f5f5' }}>
      <Group>
        <Link to="/products">My Products</Link>
        <Link to="/products/add">Add Product</Link>
      </Group>
      <Button onClick={handleLogout} color="red">
        Logout
      </Button>
    </Group>
  );
}