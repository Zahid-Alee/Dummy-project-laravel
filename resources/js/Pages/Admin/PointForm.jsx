import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = yup.object().shape({
    name: yup.string().required('Point Name is required'),
    contact: yup.string().required('Point Contact is required').matches(/^\d{11}$/, 'Contact must be 11 digits'),
    location: yup.string().required('Location is required').matches(/^[^\d].*$/, 'Location cannot start with a number'),
    city: yup.string().required('Point City is required').matches(/^[^\d].*$/, 'City cannot start with a number'),
  });
  

const PointForm = ({ onClose, notify, updatedData, edit = false, selectedPlan }) => {
  const formik = useFormik({
    initialValues: {
      name: edit ? selectedPlan.name : '',
      city: edit ? selectedPlan.city : '',
      location: edit ? selectedPlan.location : '',
      contact: edit ? selectedPlan.contact : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const pointData = {
        name: values.name,
        contact: values.contact,
        location: values.location,
        city: values.city,
      };

      edit ?
        axios.put(`/points/${selectedPlan.id}`, pointData)
          .then((res) => {
            onClose();
            updatedData();
            notify('User Updated');
          })
          .catch((e) => {
            console.log(e);
          })
        :
        axios.post(`/points`, pointData)
          .then((res) => {
            onClose();
            updatedData();
            notify(`New User Created`);
          })
          .catch((e) => {
            console.log(e);
          });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Toaster />
      <TextField
        label="Point Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      {/* Repeat this structure for other fields */}
      <TextField
        label="Point Contact"
        name="contact"
        value={formik.values.contact}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.contact && Boolean(formik.errors.contact)}
        helperText={formik.touched.contact && formik.errors.contact}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Point Location"
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Point City"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        {edit ? 'Update Point' : 'Create Point'}
      </Button>
    </form>
  );
};

export default PointForm;
