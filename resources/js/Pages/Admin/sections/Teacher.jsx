// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Container, Typography, Card, Button, Stack, TableContainer } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Iconify from '../components/iconify';
import BasicModal from '@/Components/BasicModal';
import CreateTeacherForm from './TeacherForm';
import { RiDeleteBin2Fill, RiEditLine } from 'react-icons/ri';

const Teachers = () => {
    const [teachers, setteachers] = useState([]);
    const [schools, setSchools] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedTeacher, setselectedTeacher] = useState({});

    const handleClose = (row) => {
        setOpen(false);
        setEdit(false);
    };


    const handleEdit = async (row) => {
        setOpen(true);
        setEdit(true);

        const { classes, schools, sections, ...teacherData } = row;
        const classId = classes && classes.length > 0 ? classes[0].id : null;
        const schoolId = schools && schools.length > 0 ? schools[0].id : null;
        const sectionId = sections && sections.length > 0 ? sections[0].id : null;

        setselectedTeacher({ ...teacherData, classId, schoolId ,sectionId });
    };

    useEffect(() => {
        loadteachers();
    }, []);

    const notify = (message) => {
        toast.success(message)
    }


    const loadteachers = async () => {
        try {
            const response = await axios.get('/teachers');
            setteachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers data:', error);
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Class',
            selector: (row) => row.classes && row.classes.length > 0 ? row.classes[0].name : '',
            sortable: true,
        },
        {
            name: 'School',
            selector: (row) => row.schools && row.schools.length > 0 ? row.schools[0].name : '',
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='d-flex' style={{ gap: '20px' }}>
                    <span onClick={() => handleEdit(row)}>
                        <RiEditLine size={20} />
                    </span>
                    <span onClick={() => handleDelete(row.user_id)}>
                        <RiDeleteBin2Fill size={20} />
                    </span>
                </div>
            ),
        },
    ];

    const handleDelete = async (id) => {

        await axios.delete(`/users/${id}`).
            then((res) => {
                toast.success('Teacher Deleted Successfuly');
                loadteachers();
            })
            .catch(() => toast.error('Request Rejected Successfuly')
            )
    };

    const filteredteachers = teachers;

    return (
        <Container>
            <Toaster />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Teachers</Typography>
                <Button onClick={() => { setEdit(false); setOpen(true) }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Teahcer
                </Button>
            </Stack>

            <BasicModal open={open} close={handleClose}>
                <CreateTeacherForm
                    notify={notify}
                    edit={edit}
                    updatedData={loadteachers}
                    editId={selectedTeacher?.id}
                    schoolId={selectedTeacher?.schoolId}
                    sectionId={selectedTeacher?.sectionId}
                    class_id={selectedTeacher?.classId}
                    onClose={() => setOpen(false)} />

            </BasicModal>

            <Card>
                <TableContainer>
                    <DataTable columns={columns} data={filteredteachers} />
                </TableContainer>
            </Card>
        </Container>
    );
};

export default Teachers;
