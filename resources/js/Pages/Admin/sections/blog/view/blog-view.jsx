import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BasicModal from '@/Components/BasicModal';
import CreatePlanForm from '../CreatePlanForm';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import CreateSchoolForm from '../CreatePlanForm';

const BlogView = ({ view = false }) => {

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  // const [features, setAllFeatures] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({});

  const handleClose = (row) => {
    setOpen(false);
    setEdit(false);
  };


  const handleEdit = async (row) => {
    setOpen(true);
    setEdit(true);
    setSelectedSchool(row);

  };

  const handleDelete = async (id) => {
    await axios.delete(`/schools/${id}`).
      then(() => {
        toast.success('School Deleted Successfuly');
        fetchData();
      })
      .catch(() => toast.error('Request Rejected Successfuly')
      )
  };


  const columns = [
    {
      name: 'School Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'location',
      sortable: true,
    },
    {
      name: 'District',
      selector: 'district',
      sortable: true,
    },
    {
      name: 'Created',
      selector: 'created',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className='d-flex' style={{ gap: '20px' }}>
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
      ),
    },
  ];

  async function fetchData() {
    axios.get('/schools').then((res) => {
      const schools = res?.data?.map((school, index) => ({
        id: school.id,
        name: school.name,
        location: school.location,
        district_id: school?.district?.id,
        district: school.district.name,
        address: school.address,
        created: school.created_at,
      }));
      setSchools(schools);
    }).catch((e) => {

      console.log(e)
    })

  }
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Container>
      {!view && (
        <>
          <Button
            onClick={() => { setOpen(true); setEdit(false) }}
            variant="contained"
            color="inherit"
          >
            New School
          </Button>
        </>
      )}

      <BasicModal open={open} close={handleClose}>
        <CreateSchoolForm edit={edit} updatedData={fetchData} editName={edit ? selectedSchool.name : ''} editId={selectedSchool?.id} editLocation={edit ? selectedSchool.location : ''} district_id={selectedSchool.district_id}  onClose={() => setOpen(false)} />
      </BasicModal>

      <DataTable
        title={!view && 'Schools'}
        columns={columns}
        data={schools}
        pagination
        paginationPerPage={10}
      />
    </Container>
  );
};

export default BlogView;
