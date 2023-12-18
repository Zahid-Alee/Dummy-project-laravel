// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Container, Typography, Card, Button, Stack, TableContainer } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Iconify from '../components/iconify';
import BasicModal from '@/Components/BasicModal';
import ClassFrom from './ClassForm';
import { RiDeleteBin2Fill, RiEditLine, RiEye2Fill, RiEyeFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import AttendanceForm from './AttendanceFrom';

const Attendance = ({ canedit = false }) => {
    const [attendances, setAttendances] = useState([]);
    const [sections, setSections] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState({});
    const [selectedSection, setSelectedSection] = useState(null);
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [viewAttendance, setViewAttendance] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]); 

    const handleClose = (row) => {
        setOpen(false);
        setEdit(false);
    };


    const handleEdit = async (row) => {

        
        setOpen(true);
        setEdit(true);
        setSelectedAttendance(row);
    };

    useEffect(() => {
        loadAttendace();
    }, []);

    const loadAttendace = async () => {
        try {
            const response = await axios.get('/sections');
            setSections(response.data);
        } catch (error) {
            toast.error('Failed to fetch attendance data');
        }
    };

    const columns = [
        {
            name: 'Section Name',
            selector: 'name',
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
                return <div className='d-flex' style={{ gap: '20px' }}>
                    <span style={{display:'flex',gap:'10px'}} onClick={() => handleEdit(row)}>
                        <RiEditLine size={20} /> Makrk / View
                    </span>
                </div>
            },
        },

    ];

    return (
        <Container>
            <Toaster />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Attendance</Typography>
            </Stack>
            <BasicModal open={open} close={handleClose}>
                <AttendanceForm
                    edit={edit}
                    section_id={selectedAttendance?.id}
                    updatedData={loadAttendace}
                    onClose={() => setOpen(false)}
                />

            </BasicModal>
            <Card>
                <TableContainer>
                    {<DataTable columns={columns} data={sections} />}
                </TableContainer>
            </Card>
        </Container>
    );
};

export default Attendance;
