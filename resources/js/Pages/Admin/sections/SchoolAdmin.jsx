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
import SchoolAdminForm from './SchoolAdminFrom';

const SchoolAdmin = () => {
    const [teachers, setteachers] = useState([]);
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

        const { classes, schools, ...teacherData } = row;
        const schoolId = schools && schools.length > 0 ? schools[0].id : null;

        setselectedTeacher({ ...teacherData, schoolId });
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    
    const notify = (type, message) => {

        if (type == 'error') {
            return toast.error(message)
        }
        toast.success(message);

    };


    const loadAdmins = async () => {
        try {
            const response = await axios.get('/admins');
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

        await axios.delete(`/admins/${id}`).
            then((res) => {
                toast.success('Admin Deleted Successfuly');
                loadAdmins();
            })
            .catch(() => toast.error('Request Rejected')
            )
    };

    const filteredteachers = teachers;

    return (
        <Container>
            <Toaster />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">School Admins</Typography>
                <Button onClick={() => { setEdit(false); setOpen(true) }} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New School Admin
                </Button>
            </Stack>

            <BasicModal open={open} close={handleClose}>
                <SchoolAdminForm
                    notify={notify}
                    edit={edit}
                    updatedData={loadAdmins}
                    editId={selectedTeacher?.id}
                    schoolId={selectedTeacher?.schoolId}
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

export default SchoolAdmin;
