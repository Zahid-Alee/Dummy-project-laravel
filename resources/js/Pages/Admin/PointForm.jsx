import React, { useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';



const PointForm = ({ onClose, notify, updatedData, edit = false, selectedPlan }) => {
    const [name, setName] = useState(edit ? selectedPlan.name : '');
    const [city, setCity] = useState(edit ? selectedPlan.city : '');
    const [location, setLocation] = useState(edit ? selectedPlan.location : '');
    const [contact, setContat] = useState(edit ? selectedPlan.contact : '');

    const handleRoleChange = (event) => {
        setRoleId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const pointData = {
            name: name,
            contact: contact,
            location: location,
            city
        };

        edit ?
            axios.put(`/points/${selectedPlan.id}`, pointData)
                .then((res) => {
                    onClose();
                    updatedData();
                    notify('User Updated')
                })
                .catch((e) => {
                    console.log(e)
                })
            :
            axios.post(`/points`, pointData)
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
                label="Point Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Point Contact"
                value={contact}
                onChange={(e) => setContat(e.target.value)}
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
            <TextField
                label="Point City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />

            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Point' : 'Create Point'}
            </Button>
        </form>
    );
};

export default PointForm;
