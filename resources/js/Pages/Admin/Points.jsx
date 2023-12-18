import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';
import BasicModal from '@/Components/BasicModal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Iconify from './components/iconify';
import PointForm from './PointForm';
import Scrollbar from './components/scrollbar';

const PointPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});


    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        await axios.get('/points')
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
        { name: 'Contact', selector: 'contact', sortable: true },
        , { name: 'Location ', selector: 'location', sortable: true },
        { name: 'City', selector: 'city', sortable: true },
        { name: 'Plans', selector: 'plans.length', sortable: true },
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

        await axios.delete(`/points/${id}`)
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
                <Typography variant="h4">Washing Points</Typography>
                <Button variant="contained"
                    onClick={() => { setOpen(true); setEdit(false) }}
                    color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Point
                </Button>
            </Stack>

            <Card>

                <BasicModal open={open} close={() => setOpen(false)}>
                    <PointForm notify={notify}
                        edit={edit}
                        updatedData={loadUser} userName={edit ? selectedUser?.name : ''}
                        selectedPlan={selectedUser}
                        onClose={() => setOpen(false)} />
                </BasicModal>
                <Scrollbar>
                    <TableContainer>
                        <DataTable
                            columns={columns}
                            data={users}
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

export default PointPage;