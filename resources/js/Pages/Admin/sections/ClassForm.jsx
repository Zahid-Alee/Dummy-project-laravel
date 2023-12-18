import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Class Name is required'),
  grade: yup.string().required('Grade is required'),
});

const ClassFrom = ({ onClose, notify, updatedData, edit = false, editId, editName = '', editGrade = '' }) => {
  const [name, setName] = useState(editName);
  const [grade, setGrade] = useState(editGrade);

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
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">{edit ? 'Update Class' : 'Create Class'}</Button>
    </form>
  );
};

export default ClassFrom;
