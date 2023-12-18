import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const SectionFrom = ({ onClose, class_id, updatedData, edit = false, editId, editName = '', editCapacity = '', school_id }) => {
    const [name, setName] = useState(editName);
    const [capacity, setCapactiy] = useState(editCapacity);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(class_id);

    useEffect(() => {

        axios.get('/classes')
            .then(response => {
                setClasses(response.data); // Assuming the response contains an array of districts
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const sectionData = {
            name: name,
            capacity: capacity,
            class_id: selectedClass,
        };

        if (edit) {
            return await axios.put(`/sections/${editId}`, sectionData)
                .then(response => {
                    toast.success('Updated Class');
                    updatedData();
                    onClose();
                })
                .catch(error => {
                    console.error('Error updating school:', error);
                });
        }

        await axios.post('/sections', sectionData)
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
                label="Section Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                label="Capacity"
                value={capacity}
                onChange={(e) => setCapactiy(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select Class</InputLabel>
                <Select
                    labelId="district-select-label"
                    id="district-select"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    label="Select School"
                >
                    {classes?.map(cl => (
                        <MenuItem key={cl.id} value={cl.id}>
                            {cl.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">{edit ? 'Update Class' : 'Create Class'}</Button>
        </form>
    );
};

export default SectionFrom;
