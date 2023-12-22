import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Class Name is required')
    .matches(/^[A-Za-z0-9\s]*$/, 'Class Name can only contain letters, numbers, or spaces'),
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .positive('Capacity must be a positive number')
    .required('Capacity is required'),
  class_id: yup.string().required('Class is required'),
});

const SectionFrom = ({ onClose, class_id, updatedData, edit = false, editId, editName = '', editCapacity = '', school_id }) => {
  const [name, setName] = useState(editName);
  const [capacity, setCapacity] = useState(editCapacity);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(class_id);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  }, []);

  const validateField = async (fieldName, value) => {
    try {
      await yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({
        name,
        capacity,
        class_id: selectedClass,
      });

      const sectionData = {
        name,
        capacity,
        class_id: selectedClass,
      };

      if (edit) {
        await axios.put(`/sections/${editId}`, sectionData);
        toast.success('Updated Class');
      } else {
        const response = await axios.post('/sections', sectionData);
        toast.success('Class created:', response.data);
      }

      updatedData();
      onClose();
    } catch (error) {
      console.error('Validation error:', error.errors);
      toast.error(error.errors[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Section Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          validateField('name', e.target.value);
        }}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Capacity"
        value={capacity}
        onChange={(e) => {
          setCapacity(e.target.value);
          validateField('capacity', e.target.value);
        }}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.capacity}
        helperText={errors.capacity}
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="district-select-label">Select Class</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            validateField('class_id', e.target.value);
          }}
          label="Select School"
        >
          {classes?.map(cl => (
            <MenuItem key={cl.id} value={cl.id}>
              {cl.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {edit ? 'Update Class' : 'Create Class'}
      </Button>
    </form>
  );
};

export default SectionFrom;
