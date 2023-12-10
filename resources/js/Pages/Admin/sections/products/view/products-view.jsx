import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import DataTable from 'react-data-table-component';
import { FaCheck, FaTrash } from 'react-icons/fa'; // Import React Icons
import { getSubscriptions } from '@/Pages/Admin/_mock/user';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductsView() {


  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {

    loadData();
  }, []);

  async function loadData() {

    await getSubscriptions()
      .then((data) => {
        setSubscriptions(data);
        setFilteredSubscriptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  let data = [];

  subscriptions.forEach((sub) => {
    sub.plans.forEach((plan) => {
      data.push({ user_id: sub.id, name: sub.name, created: sub.created, email: sub.email, title: plan.title, price: plan.price, plan_id: plan.id })
    })
  })

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  }

  const columns = [
    {
      name: 'User',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Plan',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
      name: 'Created At',
      selector: 'created',
      format: (row) => formatDate(row.created),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{display:'flex',gap:'10px'}}>
          <FaCheck
            style={{ cursor: 'pointer', marginRight: '8px' }}
            onClick={() => handleAccept(row.plan_id, row.user_id)}
          />
          <FaTrash
            style={{ cursor: 'pointer' }}
            onClick={() => handleRemove(row.plan_id, row.user_id)}
          />
        </div>
      ),
    },
  ];


  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = subscriptions.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.price.toString().includes(keyword)
    );
    setFilteredSubscriptions(filteredData);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };


  const handleAccept = async (row, user) => {
    // console.log(`Accepted subscription with ID: ${id}`);
    const formData = {
      user_id: user,
      plan_id: row
    }
    // router.post('/accept-req', formData);
    await axios.post('/accept-req', formData).
      then(() => {
        toast.success('Request Accepted Successfuly');
        loadData();
      })
      .catch(() => toast.error('Request Rejected Successfuly')
      )

  };

  const handleRemove =  async (row, user) => {
  
    if(!confirm('Do you want to delete users request')){
      return
    }
    const formData = {
      user_id: user,
      plan_id: row
    }
    await axios.post('/rej-req', formData).
      then(() => {
        toast.success('Request Rejected Successfuly');
        loadData();
      })
      .catch(() => toast.error('Request Rejected Successfuly')
      )

  };

  return (
    <Container>
      <Toaster />
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleFilter}
          style={{ marginBottom: '1rem' }}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
        onSelectedRowsChange={handleRowSelected}
        pagination
        paginationPerPage={5}
      />
    </Container>
  );
}
