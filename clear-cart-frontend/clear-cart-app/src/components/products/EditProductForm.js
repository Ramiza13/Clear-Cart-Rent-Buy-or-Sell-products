import React, { useEffect, useState } from 'react';
import { Stepper, Button, TextInput, MultiSelect, Textarea, NumberInput, Group, Paper, Title } from '@mantine/core';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../graphql/mutations';
import { GET_PRODUCT_BY_ID, CURRENT_USER } from '../../graphql/queries';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { cache } from '../../apolloClient';

const categoriesList = [
  'ELECTRONICS',
  'FURNITURE',
  'HOME APPLIANCES',
  'SPORTING GOODS',
  'OUTDOOR',
  'TOYS'
];

export default function EditProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = cache.readQuery({ query: CURRENT_USER })?.currentUser;

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
    skip: !id
  });

  const [formData, setFormData] = useState({
    name: '',
    categories: [],
    description: '',
    price: 0,
    availableForRent: false,
    availableForSale: true
  });

  // Fill form once product is fetched
  useEffect(() => {
    if (data?.getProductById) {
      const prod = data.getProductById;
      setFormData({
        name: prod.name,
        categories: prod.categories,
        description: prod.description,
        price: prod.price,
        availableForRent: prod.availableForRent,
        availableForSale: prod.availableForSale
      });
    }
  }, [data]);

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      notifications.show({
        title: 'Product Updated',
        message: 'Your product has been updated successfully.',
        color: 'green'
      });
      navigate('/products'); // redirect after success
    },
    onError: (err) => {
      notifications.show({
        title: 'Error',
        message: err.message,
        color: 'red'
      });
    }
  });

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((c) => (c < 4 ? c + 1 : c));
  const prevStep = () => setActive((c) => (c > 0 ? c - 1 : c));

  const handleSubmit = () => {
    updateProduct({
      variables: { id, ...formData }
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Paper p="xl" withBorder shadow="md">
      <Title order={3}>Edit Product</Title>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt="md">
        <Stepper.Step label="Title">
          <TextInput
            label="Product Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Stepper.Step>
        <Stepper.Step label="Categories">
          <MultiSelect
            label="Select categories"
            data={categoriesList}
            value={formData.categories}
            onChange={(value) => setFormData({ ...formData, categories: value })}
          />
        </Stepper.Step>
        <Stepper.Step label="Description">
          <Textarea
            label="Description"
            minRows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Stepper.Step>
        <Stepper.Step label="Price">
          <NumberInput
            label="Price"
            min={0}
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <p><strong>Title:</strong> {formData.name}</p>
          <p><strong>Categories:</strong> {formData.categories.join(', ')}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Price:</strong> ${formData.price}</p>
        </Stepper.Completed>
      </Stepper>

      <Group position="apart" mt="xl">
        {active > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
        {active < 4 && <Button onClick={nextStep}>Next</Button>}
        {active === 4 && (
          <Button onClick={handleSubmit} loading={updating}>
            Save Changes
          </Button>
        )}
      </Group>
    </Paper>
  );
}