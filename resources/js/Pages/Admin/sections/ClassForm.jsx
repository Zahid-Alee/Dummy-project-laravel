import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Class Name is required')
    .matches(/^[A-Za-z0-9\s]*$/, 'Class Name can only contain letters, numbers, or spaces'),
  grade: yup
    .number()
    .required('Grade is required')
    .integer('Grade must be an integer')
    .positive('Grade must be a positive number'), 
});



const ClassFrom = ({ onClose, updatedData, edit = false, editId, editName = '', editGrade = 0 }) => {
  const [name, setName] = useState(editName);
  const [grade, setGrade] = useState(editGrade);
  const [errors, setErrors] = useState({});

  const validateField = async (fieldName, value) => {
    try {
      await yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    validateField('name', value);
  };

  const handleGradeChange = (e) => {
    const { value } = e.target;
    const intValue = parseInt(value, 10); 
    setGrade(intValue);
    validateField('grade', intValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({
        name,
        grade,
      });

      const classData = {
        name,
        grade,
      };

      if (edit) {
        await axios.put(`/classes/${editId}`, classData);
        toast.success('Updated Class');
      } else {
        const response = await axios.post('/classes', classData);
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
        label="Class Name"
        value={name}
        onChange={handleNameChange}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Grade"
        value={grade === 0 ? '' : String(grade)} 
        onChange={handleGradeChange}
        variant="outlined"
        margin="normal"
        fullWidth
        type="number"
        error={!!errors.grade}
        helperText={errors.grade}
        inputProps={{ min: 0 }} 
      />
      <Button type="submit" variant="contained" color="primary">
        {edit ? 'Update Class' : 'Create Class'}
      </Button>
    </form>
  );
};

export default ClassFrom;
