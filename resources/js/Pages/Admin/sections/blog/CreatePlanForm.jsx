import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().matches(/^[^\d].*$/, 'Name cannot start with a number').required('School Name is required'),
  location: yup.string().required('Location is required'),
  district_id: yup.number().required('Select District'),
});

const CreateSchoolForm = ({ onClose, district_id, updatedData, edit = false, editId, editName = '', editLocation = '' }) => {
  const [name, setName] = useState(editName);
  const [location, setLocation] = useState(editLocation);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(district_id);

  useEffect(() => {
    axios.get('/districts')
      .then(response => {
        setDistricts(response.data); // Assuming the response contains an array of districts
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({
        name,
        location,
        district_id: selectedDistrict,
      });

      const schoolData = {
        name,
        location,
        district_id: selectedDistrict,
      };

      if (edit) {
        await axios.put(`/schools/${editId}`, schoolData);
        toast.success('Updated School');
        updatedData();
        onClose();
      } else {
        const response = await axios.post('/schools', schoolData);
        toast.success('School created:', response.data);
        updatedData();
        onClose();
      }
    } catch (error) {
      console.error('Validation error:', error.errors);
      toast.error(error.errors[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <TextField
        label="School Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="district-select-label">Select District</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          label="Select District"
        >
          {districts.map(district => (
            <MenuItem key={district.id} value={district.id}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Create School</Button>
    </form>
  );
};

export default CreateSchoolForm;
