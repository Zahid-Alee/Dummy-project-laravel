import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, getComparator } from '../utils';
import { getUsersList } from '@/Pages/Admin/_mock/user';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUsersList()
      .then((data) => {
        setUsers(data);
      })
      .catch((message) => {
        console.log(message);
      });
  }, []);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredUsers = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'Role', selector: 'role', sortable: true },
    { name: 'Registered on', selector: 'created', sortable: true },
    { name: 'Status', selector: 'status', sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <strong>
          {/* <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>
            Delete
          </Button> */}
          Viewable only
        </strong>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = (row) => {
    // Handle edit action
    console.log('Edit action for row:', row);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log('Delete action for id:', id);
    // Implement logic for deletion
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer>
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              paginationPerPage={rowsPerPage}
              paginationTotalRows={filteredUsers.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              sortServer
              sortIcon={<Iconify icon="eva:arrow-ios-upward-outline" />}
              onSort={(column) => handleSort(column.selector)}
            />
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default UserPage;