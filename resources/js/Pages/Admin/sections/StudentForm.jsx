import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import * as yup from 'yup';

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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch classes, schools, and sections data
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

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .matches(/^[^0-9][A-Za-z0-9\s]*$/, 'Name cannot start with a number and contain only letters, numbers, or spaces'),
        birthdate: yup.date().required('Birthdate is required').test('is-age-eligible', 'Child must be at least 3 years old', function (value) {
            const today = new Date();
            const childBirthdate = new Date(value);
            const ageDiff = today.getFullYear() - childBirthdate.getFullYear();
            const monthDiff = today.getMonth() - childBirthdate.getMonth();
            const isAgeEligible = ageDiff > 3 || (ageDiff === 3 && monthDiff >= 0);
            return isAgeEligible;
        }),
        parentName: yup
            .string()
            .required("Parent's Name is required")
            .matches(/^[^0-9][A-Za-z\s]*$/, "Parent's Name cannot start with a number and contain only letters or spaces"),
        address: yup
            .string()
            .required('Address is required')
            .matches(/^[^0-9][A-Za-z0-9\s]*$/, 'Address cannot start with a number and contain only letters, numbers, or spaces'),
        classId: yup.string().required('Class is required'),
        sectionId: yup.string().required('Section is required'),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate({
                name,
                birthdate,
                parentName,
                address,
                classId,
                sectionId,
            });

            const studentData = {
                name,
                birthdate,
                parent_name: parentName,
                address,
                class_id: classId,
                section_id: sectionId,
            };

            if (edit) {
                await axios.put(`/students/${selectedStudent.id}`, studentData);
                notify('Student details updated');
            } else {
                await axios.post(`/students`, studentData);
                notify('Student Created');
            }
            updatedData();
            onClose();
        } catch (error) {
            console.error('Validation error:', error.errors);
            toast.error(error.errors[0]);
        }
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

    const handleNameChange = (value) => {
        setName(value);
        validateField('name', value);
    };

    const validateField = async (fieldName, value) => {
        try {
            await yup.reach(validationSchema, fieldName).validate(value);
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name || ''}
            />
            <TextField
                label="Birthdate"
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
            <Button type="submit" variant="contained" color="primary">
                {edit ? 'Update Enrollment' : 'Create Enrollment'}
            </Button>
        </form>
    );
};

export default CreateStudentForm;
