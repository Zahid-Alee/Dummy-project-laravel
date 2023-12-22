import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Teacher can only contain letters and spaces')
        .required('Teacher Name is required'),
    email: yup.string().email('Invalid email').required('User Email is required'),
    school_id: yup.number().required('Select School'),
    class_id: yup.number().required('Select Class'),
    section_id: yup.number().required('Select Section'),
});


const CreateTeacherForm = ({ onClose, notify, updatedData, edit = false, editId, schoolId = null, class_id = null, sectionId }) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [school_id, setschool_id] = useState(edit ? schoolId : null);
    const [teacherClass, setClassId] = useState(edit ? class_id : null);
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [password, setPassword] = useState('newteacher');
    const [section_id, setSectionId] = useState(sectionId)
    const [sections, setSections] = useState([]);

    useEffect(() => {
        axios.get('/schools')
            .then(response => {
                setSchools(response.data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    }, []);


    const handleSchoolSelect = async (event) => {
        setschool_id(event.target.value);

        try {
            const response = await axios.get(`/getclasses/${event.target.value}`);
            setClasses(response.data);
            setSections([]);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleClasses = async (e) => {
        setClassId(e.target.value);

        try {
            const response = await axios.get(`/getsections/${e.target.value}`);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
        validateField('name', value);
    };


    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        validateField('email', value);
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
            validationSchema.validateSync({
                name,
                email,
                school_id,
                class_id: teacherClass,
                section_id,
            });
            const userData = {
                name,
                email,
                school_id,
                class_id: teacherClass,
                section_id,
                password: password,
                password_confirmation: password,
                role: 'teacher'
            };

            if (edit) {
                await axios.put(`/teachers/${editId}`, userData);
                onClose();
                updatedData();
                notify('User Updated');
            } else {
                const userResponse = await axios.post(`/users`, userData);
                userData.user_id = userResponse?.data?.id;
                await axios.post('/teachers', userData);
                notify('New Teacher Created');
                updatedData();
                onClose();
            }
        } catch (error) {
            if (error.path === 'name') {
                setNameError(error.message);
            } else if (error.path === 'email') {
                setEmailError(error.message);
            }

            console.error('Validation error:', error.errors);
            notify(error.errors[0], 'error');
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
                error={!!nameError}
                helperText={nameError}
            />
               <TextField
                label="User Email"
                value={email}
                onChange={handleEmailChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!emailError}
                helperText={emailError}
            />
            </>}

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select School</InputLabel>
                <Select
                    label="Role ID"
                    value={school_id}
                    onChange={handleSchoolSelect}
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
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select Class</InputLabel>
                <Select
                    label="Class ID"
                    value={teacherClass}
                    onChange={handleClasses}
                    variant="outlined"
                    fullWidth
                >
                    {classes?.map(cl => (
                        <MenuItem key={cl.id} value={cl.id}>
                            {cl.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select Section</InputLabel>
                <Select
                    label="Section ID"
                    value={section_id}
                    onChange={(e) => { setSectionId(e.target.value) }}
                    variant="outlined"
                    fullWidth
                >
                    {sections?.map(s => (
                        <MenuItem key={s.id} value={s.id}>
                            {s.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Teacher' : 'Create Teacher'}
            </Button>
        </form>
    );
};

export default CreateTeacherForm;
