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
import SectionFrom from './SectionForm';

const Classes = ({ canedit = false }) => {
    const [classes, setSections] = useState([]);
    const [sections, setsections] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedSection, setselectedSection] = useState({});

    const handleClose = (row) => {
        setOpen(false);
        setEdit(false);
    };


    const handleEdit = async (row) => {
        setOpen(true);
        setEdit(true);
        setselectedSection(row);

    };



    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        try {
            const response = await axios.get('/sections');
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching classes data:', error);
            toast.error('Failed to fetch classes data');
        }
    };

    const columns = [
        {
            name: 'Section Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Capacity',
            selector: 'capacity',
            sortable: true,
        },
        {
            name: 'Class Name',
            selector: 'class.name',
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
            }
            ,
        },

    ];


    const handleDelete = async (id) => {
        await axios.delete(`/sections/${id}`).
            then(() => {
                toast.error('Section Deleted Successfuly');
                loadSections();
            })
            .catch(() => toast.error('Server Error ')
            )
    };

    const filteredClasses = classes; // Replace this with your filtering logic

    return (
        <Container>
            <Toaster />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Sections</Typography>
                {canedit && <Button onClick={() => setOpen(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Section
                </Button>}
            </Stack>

            <BasicModal open={open} close={handleClose}>
                <SectionFrom
                    edit={edit}
                    updatedData={loadSections}
                    editName={edit ? selectedSection?.name : ''}
                    editCapacity={edit ? selectedSection.capacity : ''}
                    editId={selectedSection?.id}
                    class_id={edit ? selectedSection.class_id : ''}
                    onClose={() => setOpen(false)}
                />
            </BasicModal>
            <Card>
                <TableContainer>
                    <DataTable columns={columns} data={filteredClasses} />
                </TableContainer>
            </Card>
        </Container>
    );
};

export default Classes;
