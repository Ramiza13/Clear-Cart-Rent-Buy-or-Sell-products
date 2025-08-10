import React, { useState, useEffect } from 'react';
import { Stepper, Button, TextInput, MultiSelect, Textarea, NumberInput, Group, Paper, Title } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../graphql/mutations';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../../graphql/queries';
import { cache } from '../../apolloClient';

const categoriesList = [
  'ELECTRONICS',
  'FURNITURE',
  'HOME APPLIANCES',
  'SPORTING GOODS',
  'OUTDOOR',
  'TOYS'
];

export default function AddProductForm({ onProductAdded }) {
    const navigate = useNavigate();
    const currentUser = cache.readQuery({ query: CURRENT_USER })?.currentUser;

    // Redirect user to login page if not logged in
    useEffect(() => {
        if (!currentUser) {
        navigate('/login');
        }
    }, [currentUser, navigate]);

    const [active, setActive] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        categories: [],
        description: '',
        price: 0,
        availableForRent: false,
        availableForSale: true
    });

  const [addProduct, { loading }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      notifications.show({
        title: 'Product Added',
        message: 'Your product has been added successfully.',
        color: 'green'
      });
      onProductAdded?.();
    },
    onError: (err) => {
      notifications.show({
        title: 'Error',
        message: err.message,
        color: 'red'
      });
    }
  });

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = () => {
    if (!currentUser?.id) {
        notifications.show({
          title: 'Error',
          message: 'You must be logged in to add a product.',
          color: 'red'
        });
        navigate('/login');
        return;
      }
    
      addProduct({
        variables: { ...formData, ownerId: currentUser.id }
      });
  };

  return (
    <Paper p="xl" withBorder shadow="md">
      <Title order={3}>Create Product</Title>
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
          <Button onClick={handleSubmit} loading={loading}>
            Save
          </Button>
        )}
      </Group>
    </Paper>
  );
}