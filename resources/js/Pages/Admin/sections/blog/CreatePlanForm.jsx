import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  packageName: yup.string().required('Plan Name is required'),
  price: yup.number().min(1, 'Price must be greater than 1').required('Price is required').nullable(),
  selectedFeatures: yup.array().min(1, 'Select at least one feature').required('Features are required'),
  selectedWashingPoint: yup.string().required('Select a Washing Point'),
});

const CreatePlanForm = ({
  onClose,
  updatedData,
  features,
  washingPoints,
  edit = false,
  editId,
  editTtile = '',
  editFeatures = [],
  editPrice = 0,
  notify,
}) => {
  const [packageName, setPackageName] = useState(editTtile);
  const [selectedFeatures, setSelectedFeatures] = useState(editFeatures);
  const [price, setSelectedPrice] = useState(editPrice);
  const [selectedWashingPoint, setSelectedWashingPoint] = useState('');

  const handleFeatureChange = (event) => {
    setSelectedFeatures(event.target.value);
  };

  const handleWashingPointChange = (event) => {
    setSelectedWashingPoint(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validationSchema.validate({
      packageName,
      price,
      selectedFeatures,
      selectedWashingPoint,
    })
      .then(() => {
        const planData = {
          title: packageName,
          price: price,
          feature_ids: selectedFeatures,
          washing_point_id: selectedWashingPoint,
        };

        if (edit) {
          axios.put(`/plans/${editId}`, planData)
            .then(response => {
              toast.success('Updated Plan');
              updatedData();
              onClose();
              notify('Updated Plan', 'success');
            })
            .catch(error => {
              console.error('Error updating plan:', error);
              notify('Error updating plan', 'error');
            });
        } else {
          axios.post('/plans', planData)
            .then(response => {
              updatedData();
              onClose();
              notify('Plan Created', 'success');
            })
            .catch(error => {
              console.error('Error creating plan:', error);
              notify('Error creating plan', 'error');
            });
        }
      })
      .catch((error) => {
        console.error('Validation error:', error.errors);
        notify(error.errors[0], 'error');
      });
  };

  return (
    <form style={{ display: 'flex', flexFlow: "column", gap: '10px' }} onSubmit={handleSubmit}>
      <TextField
        label="Plan Name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setSelectedPrice(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControl>
        <InputLabel id="washing-point-select-label">Select Washing Point</InputLabel>
        <Select
          labelId="washing-point-select-label"
          id="washing-point-select"
          value={selectedWashingPoint}
          onChange={handleWashingPointChange}
          variant="outlined"
        >
          {washingPoints?.map((point) => (
            <MenuItem key={point.id} value={point.id}>
              {point.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl >
        <InputLabel id="features-select-label">Select Features</InputLabel>
        <Select
          labelId="features-select-label"
          id="features-select"
          multiple
          value={selectedFeatures}
          onChange={handleFeatureChange}
          renderValue={(selected) => selected.join(', ')}
          variant="outlined"
        >
          {features?.map((feature) => (
            <MenuItem key={feature.id} value={feature.id}>
              <Checkbox checked={selectedFeatures.indexOf(feature.id) > -1} />
              <ListItemText primary={feature.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Create Plan</Button>
    </form>
  );
};

export default CreatePlanForm;
