import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_PRODUCTS, CURRENT_USER } from '../../graphql/queries';
import { DELETE_PRODUCT } from '../../graphql/mutations';
import { Table, Button, Card, Group, Text, Loader, Center, Container } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { cache } from '../../apolloClient';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const navigate = useNavigate();
    const currentUser = cache.readQuery({ query: CURRENT_USER })?.currentUser;

    // Redirect user to login page if not logged in
    useEffect(() => {
        if (!currentUser) {
        navigate('/login');
        }
    }, [currentUser, navigate]);

    const { loading, error, data } = useQuery(GET_MY_PRODUCTS, {
        variables: { ownerId: currentUser?.id },
        skip: !currentUser
    });

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      notifications.show({
        title: 'Deleted',
        message: 'Product deleted successfully',
        color: 'green'
      });
    },
    update: (cache, { data: { deleteProduct } }) => {
      if (deleteProduct) {
        cache.modify({
          fields: {
            myProducts(existingProducts = []) {
              return existingProducts.filter(p => p.__ref !== `Product:${deleteProduct}`);
            }
          }
        });
      }
    }
  });

  if (!currentUser) return <Text>Please log in</Text>;
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading products</Text>;

  const openDeleteModal = (id) => {
    modals.openConfirmModal({
      title: 'Delete product',
      children: <Text>Are you sure you want to delete this product?</Text>,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteProduct({ variables: { id } });
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Products</h2>
      {data.myProducts.map(product => (
        <Card key={product.id} shadow="sm" p="lg" mt="md">
          <Group position="apart">
            <div>
              <Text weight={500}>{product.name}</Text>
              <Text size="sm">{product.description}</Text>
            </div>
            <Group>
              <Button color="blue">Edit</Button>
              <Button color="red" onClick={() => openDeleteModal(product.id)}>Delete</Button>
            </Group>
          </Group>
        </Card>
      ))}
    </div>
  );
}