import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const CreateStudentForm = ({ onClose, notify, updatedData, edit = false, selectedStudent }) => {
    const [name, setName] = useState(edit ? selectedStudent?.name : '');
    const [birthdate, setBirthdate] = useState(edit ? selectedStudent?.birthdate : '');
    const [parentName, setParentName] = useState(edit ? selectedStudent?.parent_name : '');
    const [address, setAddress] = useState(edit ? selectedStudent?.address : '');
    const [schoolId, setSchoolId] = useState(edit ? selectedStudent?.school_id : '');
    const [classId, setClassId] = useState(edit ? selectedStudent?.class_id : '');
    const [sectionId, setSectionId] = useState(edit ? selectedStudent?.section_id : '');
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
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
                console.error('Error fetching schools:', error);
            });

        axios.get('/sections')
            .then(response => {
                setSections(response.data);
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const studentData = {
            name: name,
            birthdate: birthdate,
            parent_name: parentName,
            address: address,
            school_id: schoolId,
            class_id: classId,
            section_id: sectionId
        };

        edit ?
            axios.put(`/students/${selectedStudent.id}`, studentData).then(() => {

                notify('Student details updated')
            }).catch((res) => {
            })
            :
            axios.post(`/students`, studentData).then((res) => {

                notify('Student  Created')
            }).catch(() => {

            })

        onClose();
        updatedData();
    };

    const handleClass = async (e) => {
        setClassId(e.target.value);
        try {
            const response = await axios.get(`/getsections/${e.target.value}`);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                required
            />
            <TextField
                label=""
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                variant="outlined"
                margin="normal"
                type='date'
                fullWidth
                required
            />
            <TextField
                label="Parent's Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                required
            />
            <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                required
            />

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select Class</InputLabel>
                <Select
                    label="Class"
                    value={classId}
                    onChange={handleClass}
                    variant="outlined"
                    fullWidth
                    required
                >
                    {classes.map(cl => (
                        <MenuItem key={cl.id} value={cl.id}>
                            {cl.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="district-select-label">Select Section</InputLabel>
                <Select
                    label="Section"
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                >
                    {sections.map(sec => (
                        <MenuItem key={sec.id} value={sec.id}>
                            {sec.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                {edit ? 'Update Enrollment' : 'Create Enrollment'}
            </Button>
        </form>
    );
};

export default CreateStudentForm;
