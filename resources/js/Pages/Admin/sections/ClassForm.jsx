import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const ClassFrom = ({ onClose, notify, updatedData, edit = false, editId, editName = '', editGrade = '', school_id }) => {
  
  const [name, setName] = useState(editName);
  const [grade, setgrade] = useState(editGrade);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const schoolData = {
      name: name,
      grade: grade,
    };

    if (edit) {
      return await axios.put(`/classes/${editId}`, schoolData)
        .then(response => {
          toast.success('Updated Class');
          updatedData();
          onClose();
        })
        .catch(error => {
          console.error('Error updating school:', error);
        });
    }

    await axios.post('/classes', schoolData)
      .then(response => {
        toast.success('Class created:', response.data);
        updatedData();
        onClose();
      })
      .catch(error => {
        console.error('Error creating school:', error);
      });
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
        label="grade"
        value={grade}
        onChange={(e) => setgrade(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      {/* <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="district-select-label">Select School</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={selectedSchool}
          onChange={(e) => setselectedSchool(e.target.value)}
          label="Select School"
        >
          {schools?.map(school => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">{edit ? 'Update Class' : 'Create Class'}</Button>
    </form>
  );
};

export default ClassFrom;
