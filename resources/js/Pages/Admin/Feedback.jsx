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

const FeedbackPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});


    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        await axios.get('/feedbacks')
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
        { name: 'Name', selector: 'user.name', sortable: true },
        { name: 'Message', selector: 'message', sortable: true },
        , { name: 'Date ', selector: 'created', sortable: true },

    ];

    const notify = (message) => {

        toast.success(message);

    };

    return (
        <Container>

            <Card>
                <Typography variant="h4">Feedbacks</Typography>
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

export default FeedbackPage;