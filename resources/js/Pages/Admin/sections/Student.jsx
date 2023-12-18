// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Container, Typography, Card, Button, Stack, TableContainer } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Iconify from '../components/iconify';
import BasicModal from '@/Components/BasicModal';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import CreateStudentForm from './StudentForm';

const Students = ({ canedit=false }) => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedStudent, setselectedStudent] = useState({});

  const handleClose = (row) => {
    setOpen(false);
    setEdit(false);
  };

  const notify = (message) => {
    toast.success(message);
  }



  const handleEdit = async (row) => {
    setOpen(true);
    setEdit(true);
    setselectedStudent(row);

  };

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get('/students');
      setClasses(response.data);
    } catch (error) {
      toast.error('Failed to fetch classes data');
    }
  };

  const columns = [

    {
      name: 'Student Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Class',
      selector: 'class_model.name',
      sortable: true,
    },
    {
      name: 'Grade',
      selector: 'class_model.grade',
      sortable: true,
    },
    {
      name: 'School',
      selector: 'school.name',
      sortable: true,
    },
    {
      name: 'Adress',
      selector: 'address',
      sortable: true,
    },


    {
      name: 'Actions',
      cell: (row) => {
        return canedit && <div className='d-flex' style={{ gap: '20px' }}>
          <span
            onClick={() => handleEdit(row)}
          >
            <RiEditLine size={20} />

          </span>
          <span
            onClick={() => handleDelete(row.id)}
          >
            <RiDeleteBinLine size={20} />

          </span>
        </div>
      },
    },
    // Add more columns as needed
  ];
  const handleDelete = async (id) => {
    await axios.delete(`/students/${id}`).
      then(() => {
        toast.success('Student Deleted Successfuly');
        loadStudents();
      })
      .catch(() => toast.error('Request Rejected Successfuly')
      )
  };

  const filteredClasses = classes; // Replace this with your filtering logic

  return (
    <Container>
      <Toaster />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Enrollment</Typography>
        {canedit&&<Button onClick={() => setOpen(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Enrollment
        </Button>}
      </Stack>

      <div >
        <BasicModal open={open} close={handleClose}>
          <CreateStudentForm edit={edit} updatedData={loadStudents} notify={notify} selectedStudent={selectedStudent} onClose={() => setOpen(false)} />
        </BasicModal>
      </div>

      <Card>
        <TableContainer>
          <DataTable columns={columns} data={filteredClasses} />
        </TableContainer>
      </Card>
    </Container>
  );
};

export default Students;
