// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Container, Typography, Card, Button, Stack, TableContainer } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Iconify from '../components/iconify';
import BasicModal from '@/Components/BasicModal';
import ClassFrom from './ClassForm';
import { RiDeleteBin2Fill, RiEditLine } from 'react-icons/ri';

const Classes = ({ canedit = false }) => {
    const [classes, setClasses] = useState([]);
    const [schools, setSchools] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedClass, setselectedClass] = useState({});

    const handleClose = (row) => {
        setOpen(false);
        setEdit(false);
    };


    const handleEdit = async (row) => {
        setOpen(true);
        setEdit(true);
        setselectedClass(row);

    };

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        try {
            const response = await axios.get('/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes data:', error);
            toast.error('Failed to fetch classes data');
        }
    };

    const columns = [
        {
            name: 'Class Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Grade',
            selector: 'grade',
            sortable: true,
        },
        {
            name: 'School Name',
            selector: 'school.name', // Access school name through nested property
            sortable: true,
        },
        {
            name: 'Location',
            selector: 'school.location', // Access school location through nested property
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => {
                return canedit && <div className='d-flex' style={{ gap: '20px' }}>
                    <span onClick={() => handleEdit(row)}>
                        <RiEditLine size={20} />
                    </span>
                    <span onClick={() => handleDelete(row.id)}>
                        <RiDeleteBin2Fill size={20} />
                    </span>
                </div>
            },
        },

    ];


    const handleDelete = async (id) => {
        await axios.delete(`/classes/${id}`).
            then(() => {
                toast.error('Class Deleted Successfuly');
                loadClasses();
            })
            .catch(() => toast.error('Request Rejected ')
            )
    };

    const filteredClasses = classes; // Replace this with your filtering logic

    return (
        <Container>
            <Toaster />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Classes</Typography>
                {canedit && <Button onClick={() => setOpen(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Class
                </Button>}
            </Stack>

            <BasicModal open={open} close={handleClose}>
                <ClassFrom
                    edit={edit}
                    updatedData={loadClasses}
                    editName={edit ? selectedClass.name : ''}
                    editGrade={edit ? selectedClass.grade : ''}
                    editId={selectedClass?.id}
                    school_id={edit ? selectedClass.school_id : ''}
                    onClose={() => setOpen(false)}
                />

            </BasicModal>

            <Card>
                <TableContainer>
                    { <DataTable columns={columns} data={filteredClasses} />}
                </TableContainer>
            </Card>
        </Container>
    );
};

export default Classes;
