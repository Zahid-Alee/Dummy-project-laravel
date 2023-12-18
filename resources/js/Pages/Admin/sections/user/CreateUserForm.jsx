import React, { useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const roles = [
    { name: 'Admin', id: 1 },
    { name: 'Scool Admin', id: 2 },
    { name: 'Teacher', id: 3 },
    // Add other roles as needed
];

const CreateUserForm = ({ onClose, notify, updatedData, edit = false, editId, userName = '', userEmail = '' }) => {
    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState('');

    const handleRoleChange = (event) => {
        setRoleId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            role:'user'
        };

        edit ?
            axios.put(`/users/${editId}`, userData)
                .then((res) => {
                    onClose();
                    updatedData();
                    notify('User Updated')
                })
                .catch((e) => {
                    console.log(e)
                })
            :
            axios.post(`/users`, userData)
                .then((res) => {
                    onClose();
                    updatedData();
                    notify(`New User Created`)
                })
                .catch((e) => {
                    console.log(e)
                })
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster />
            <TextField
                label="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update User' : 'Create User'}
            </Button>
        </form>
    );
};

export default CreateUserForm;
