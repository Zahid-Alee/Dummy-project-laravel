import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, getComparator } from '../utils';
import { getUsersList } from '@/Pages/Admin/_mock/user';
import { RiDeleteBack2Fill, RiDeleteBack2Line, RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';
import CreateUserForm from '../CreateUserForm';
import BasicModal from '@/Components/BasicModal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    await axios.get('/users')
      .then((res) => {
        console.log(res.data)
        setUsers(res.data);
      })
      .catch((message) => {
        console.log(message);
      });
  }


  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const editUser = (row) => {
    setEdit(true);
    setSelectedUser(row)
    setOpen(true);
  }

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    , { name: 'Registered on', selector: 'created_at', sortable: true },
    { name: 'Role', selector: 'role', sortable: true },
    { name: 'Status', selector: 'status', sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <span onClick={() => { editUser(row) }}>
            <RiEdit2Fill />
          </span>
          <span onClick={() => { handleDelete(row.id) }}>
            <RiDeleteBin2Fill />
          </span>
        </div>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  const notify = (message) => {

    toast.success(message);

  };

  const handleDelete = async (id) => {

    await axios.delete(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
        loadUser();
      })
      .catch((e) => {
        console.log(e)
      })
  };

  return (
    <Container>

      <Toaster />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained"
          onClick={() => { setOpen(true); setEdit(false) }}
          color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>

        <BasicModal open={open} close={() => setOpen(false)}>
          <CreateUserForm notify={notify} edit={edit} updatedData={loadUser} userName={edit ? selectedUser?.name : ''} editId={selectedUser?.id} userRoleID={edit ? selectedUser.role_id : 3} userEmail={edit ? selectedUser?.email : ''} onClose={() => setOpen(false)} />

        </BasicModal>
        <Scrollbar>
          <TableContainer>
            <DataTable
              columns={columns}
              data={users}
              pagination
              paginationPerPage={rowsPerPage}
              paginationTotalRows={users.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              sortServer
              sortIcon={<Iconify icon="eva:arrow-ios-upward-outline" />}
              onSort={(column) => handleSort(column.selector)}
            />
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
};

export default UserPage;