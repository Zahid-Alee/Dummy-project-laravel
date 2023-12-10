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





const BlogView = ({ view = false }) => {

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [features, setAllFeatures] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});

  const handleClose = (row) => {
    setOpen(false);
    setEdit(false);
  };


  const handleEdit = async (row) => {
    setOpen(true);
    setEdit(true);
    setSelectedPlan(row);

    // await axios.post('/accept-req', formData).
    //   then(() => {

    //     toast.success('Request Accepted Successfuly');
    //     fetchData();
    //   })
    //   .catch(() => toast.error('Request Rejected Successfuly')
    //   )

  };

  const handleDelete = async (id) => {
    // Logic for handling delete action
    await axios.delete(`/plans/${id}`).
      then(() => {

        toast.success('Request Accepted Successfuly');
        fetchData();
      })
      .catch(() => toast.error('Request Rejected Successfuly')
      )
    // Perform delete API call or local deletion and update plans state
  };


  const columns = [
    {
      name: 'Plan Name',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
      name: 'Updated',
      selector: 'created_at',
      sortable: true,
    },
    {
      name: 'Features',
      cell: (row) => (
        <ul>
          {row.features.map((feature) => (
            <li key={feature.id}>{feature.name}</li>
          ))}
        </ul>
      ),
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
    try {
      const [plansRes, featuresRes] = await Promise.all([
        axios.get('/plans'),
        axios.get('/api/features'),
      ]);
      setPlans(plansRes.data);
      setAllFeatures(featuresRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
            New Package
          </Button>
        </>
      )}

      <BasicModal open={open} close={handleClose}>
        <CreatePlanForm edit={edit} updatedData={fetchData} editTtile={edit ? selectedPlan.title : ''} editId={selectedPlan?.id} editPrice={edit ? selectedPlan.price : 0} features={features} onClose={() => setOpen(false)} />
      </BasicModal>

      <DataTable
        title={!view && 'Plans'}
        columns={columns}
        data={plans}
        pagination
        paginationPerPage={10}
      />
    </Container>
  );
};

export default BlogView;
