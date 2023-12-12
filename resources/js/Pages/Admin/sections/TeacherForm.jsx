import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';


const CreateTeacherForm = ({ onClose, notify, updatedData, edit = false, editId, schoolId = null, class_id = null, sectionId }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [school_id, setschool_id] = useState(edit ? schoolId : null);
    const [teacherClass, setClassId] = useState(edit ? class_id : null);
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [password, setPassword] = useState('newteacher');
    const [section_id, setSectionId] = useState(sectionId)
    const [sections, setSections] = useState([]);

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

        axios.get('/sections')
            .then(response => {
                setSections(response.data);
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



    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            school_id: school_id,
            class_id: teacherClass,
            section_id,
            password: password,
            password_confirmation: password,
            role: 'teacher'
        };


        edit ?
            axios.put(`/teachers/${editId}`, userData)
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
                    await axios.post('/teachers', userData)
                        .then((res) => {
                            notify('New Teacher Created');
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
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Teacher' : 'Create Teacher'}
            </Button>
        </form>
    );
};

export default CreateTeacherForm;
