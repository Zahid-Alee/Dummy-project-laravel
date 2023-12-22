import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'Name can only contain letters, numbers, and spaces')
    .required('School Name is required'),
  location: yup.string().required('Location is required'),
  district_id: yup.number().required('Select District'),
});


const CreateSchoolForm = ({ onClose, district_id, updatedData, edit = false, editId, editName = '', editLocation = '' }) => {
  const [name, setName] = useState(editName);
  const [nameError, setNameError] = useState('');
  const [location, setLocation] = useState(editLocation);
  const [locationError, setLocationError] = useState('');
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


  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.fields[fieldName].validate(value);
      if (fieldName === 'name') {
        setNameError('');
      } else if (fieldName === 'location') {
        setLocationError('');
      }
      // Add handling for other fields if necessary
    } catch (error) {
      if (fieldName === 'name') {
        setNameError(error.message);
      } else if (fieldName === 'location') {
        setLocationError(error.message);
      }
      // Add handling for other fields if necessary
    }
  };


  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateField('name', value);
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);
    validateField('location', value);
  };


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
      <TextField
        label="School Name"
        value={name}
        onChange={handleNameChange}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        label="Location"
        value={location}
        onChange={handleLocationChange}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!locationError}
        helperText={locationError}
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
