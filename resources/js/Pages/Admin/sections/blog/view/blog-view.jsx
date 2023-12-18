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
  const [washingPoints, setWashingPoints] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null)

  async function fetchWashingPoints() {
    try {
      const response = await axios.get('/points');
      setWashingPoints(response.data);
    } catch (error) {
      console.error('Error fetching washing points:', error);
    }
  }

  const handleClose = (row) => {
    setOpen(false);
    setEdit(false);
  };

  const notify = (message, type) => {

    if (type === 'success') {
      return toast.success(message)
    }
    return toast.error(message)
  }

  const handleEdit = async (row) => {
    setOpen(true);
    setEdit(true);
    setSelectedPlan(row);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/plans/${id}`).
      then(() => {

        toast.success('Request Accepted Successfuly');
        fetchData();
      })
      .catch(() => toast.error('Request Rejected ')
      )
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
      name: 'Washing Point',
      selector: 'washing_point_id',
      cell: (row) => {
        const washingPoint = washingPoints.find(
          (point) => point.id === row.washing_point_id
        );
        return washingPoint ? washingPoint.name : 'Not assigned';
      },
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

    fetchWashingPoints();
    fetchData();
  }, []);



  return (
    <Container>
    <Toaster />

    {!view && (
      <>
        <Button
          onClick={() => {
            setOpen(true);
            setEdit(false);
          }}
          variant="contained"
          color="inherit"
        >
          New Plan
        </Button>
      </>
    )}

    <BasicModal open={open} close={handleClose}>
      <CreatePlanForm
        edit={edit}
        notify={notify}
        updatedData={fetchData}
        editTtile={edit ? selectedPlan.title : ''}
        editId={selectedPlan?.id}
        editPrice={edit ? selectedPlan.price : 0}
        features={features}
        washingPoints={washingPoints} // Pass washingPoints to the form
        selectedWashingPoint={edit ? selectedPlan.washing_point_id : null}
        onClose={() => setOpen(false)}
      />
    </BasicModal>

    <DataTable title={!view && 'Plans'} columns={columns} data={plans} />
  </Container>

  );
};

export default BlogView;
