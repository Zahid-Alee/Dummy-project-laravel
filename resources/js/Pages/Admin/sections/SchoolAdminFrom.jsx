import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField ,FormControl ,InputLabel } from '@mui/material';


const SchoolAdminForm = ({ onClose, notify, updatedData, edit = false, editId, schoolId = null}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [school_id, setschool_id] = useState(edit ? schoolId : null);
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [password, setPassword] = useState('schooladmin');

    useEffect(() => {

        axios.get('/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });

        axios.get('/schools')
            .then(response => {
                setSchools(response.data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    }, []);


    const handleRoleChange = (event) => {
        setschool_id(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            school_id: school_id,
            password: password,
            password_confirmation: password,
            role: 'school_admin'
        };


        edit ?
            axios.put(`/admins/${editId}`, userData)
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
                .then(async (res) => {
                    userData.user_id = res?.data?.id;
                    await axios.post('/admins', userData)
                        .then((res) => {
                            notify('New School Admin Created');
                            updatedData();
                            onClose();
                        })
                })
                .catch((e) => {
                    notify(e.message)
                })
    };

    return (
        <form onSubmit={handleSubmit}>

            {!edit && <>
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
            </>}

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select School</InputLabel>
                <Select
                    label="Role ID"
                    value={school_id}
                    onChange={handleRoleChange}
                    variant="outlined"
                    fullWidth
                >
                    {schools?.map(sch => (
                        <MenuItem key={sch.id} value={sch.id}>
                            {sch.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Admin' : 'Create Admin'}
            </Button>
        </form>
    );
};

export default SchoolAdminForm;
