import React from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('User Name is required')
      .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Username must start with a letter and can contain alphanumeric characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });
  

const CreateUserForm = ({ onClose, notify, updatedData, edit = false, editId, userName = '', userEmail = '' }) => {
  const handleSubmit = (values) => {
    const { name, email, password } = values;
    const userData = {
      name,
      email,
      password,
      password_confirmation: password,
      role: 'user',
    };

    edit ?
      axios.put(`/users/${editId}`, userData)
        .then((res) => {
          onClose();
          updatedData();
          notify('User Updated');
        })
        .catch((e) => {
          console.log(e);
          notify('error', e?.message);
        })
      :
      axios.post(`/users`, userData)
        .then((res) => {
          onClose();
          updatedData();
          notify(`New User Created`);
        })
        .catch((e) => {
          console.log(e);
        });
  };

  return (
    <Formik
      initialValues={{ name: userName, email: userEmail, password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleChange, handleBlur }) => (
        <Form>
          <Toaster />
          <Field
            as={TextField}
            name="name"
            label="User Name"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="name">
            {(msg) => (
              <Typography variant="body2" color="error">
                {msg}
              </Typography>
            )}
          </ErrorMessage>

          <Field
            as={TextField}
            name="email"
            label="User Email"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email">
            {(msg) => (
              <Typography variant="body2" color="error">
                {msg}
              </Typography>
            )}
          </ErrorMessage>

          <Field
            as={TextField}
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password">
            {(msg) => (
              <Typography variant="body2" color="error">
                {msg}
              </Typography>
            )}
          </ErrorMessage>

          <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
            {edit ? 'Update User' : 'Create User'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
