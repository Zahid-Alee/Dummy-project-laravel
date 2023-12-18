import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

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
    const planData = {
      title: packageName,
      price: price,
      feature_ids: selectedFeatures,
      washing_point_id: selectedWashingPoint,

    };

    if (edit) {
      return axios.put(`/plans/${editId}`, planData)
        .then(response => {
          toast.success('Updated Plan')
          updatedData();
          onClose();
          notify('Updated Plan','success');
        })
        .catch(error => {
          console.error('Error creating plan:', error);
          notify('Error try again','error');

        });
    }

    axios.post('/plans', planData)
      .then(response => {
        updatedData();
        onClose();
        notify('Updated Plan','success');
      })
      .catch(error => {
        console.error('Error updating plan:', error);
      });

  };

  return (
    <form style={{display:'flex',flexFlow:"column", gap:'10px'}} onSubmit={handleSubmit}>
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
