import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField, FormControl, InputLabel, FormHelperText } from '@mui/material';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
        .required('User Name is required'),
    email: yup.string().email('Invalid email').required('User Email is required'),
    school_id: yup.number().required('Select School'),
});



const SchoolAdminForm = ({ onClose, notify, updatedData, edit = false, editId, schoolId = null }) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [school_id, setSchool_id] = useState(edit ? schoolId : null);
    const [schoolError, setSchoolError] = useState('');
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

    const handleNameChange = (event) => {
        setName(event.target.value);
        validateField('name', event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        validateField('email', event.target.value);
    };

    const handleRoleChange = (event) => {
        setSchool_id(event.target.value);
        validateField('school_id', event.target.value);
    };


    const validateField = async (fieldName, value) => {
        try {
            await validationSchema.validateAt(fieldName, { [fieldName]: value });
            if (fieldName === 'name') {
                setNameError('');
            } else if (fieldName === 'email') {
                setEmailError('');
            } else if (fieldName === 'school_id') {
                setSchoolError('');
            }
        } catch (error) {
            if (fieldName === 'name') {
                setNameError(error.message);
            } else if (fieldName === 'email') {
                setEmailError(error.message);
            } else if (fieldName === 'school_id') {
                setSchoolError(error.message);
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate({
                name,
                email,
                school_id,
            });

            const userData = {
                name,
                email,
                school_id,
                password,
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
                        notify('error', e.message)
                    })

        } catch (error) {
            console.error('Validation error:', error.errors);
            notify('error', error.errors[0],);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            {!edit && <>
                <TextField
                    label="Full Name"
                    value={name}
                    onChange={handleNameChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                {nameError && <FormHelperText error>{nameError}</FormHelperText>}

                <TextField
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                {emailError && <FormHelperText error>{emailError}</FormHelperText>}
            </>}

            <FormControl fullWidth variant="outlined" margin="normal" error={!!schoolError}>
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
                {schoolError && <FormHelperText>{schoolError}</FormHelperText>}
            </FormControl>

            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Admin' : 'Create Admin'}
            </Button>
        </form>
    );
};

export default SchoolAdminForm;
