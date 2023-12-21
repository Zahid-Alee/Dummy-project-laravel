import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import SalesChart from './SalesData';
import UserCharts from './RegisteredUsers';
import { getUsersList } from '@/Pages/Admin/_mock/user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChalkboardTeacher, FaSchool, FaUser, FaUserShield } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import ChartComponent from './Charts';

// ----------------------------------------------------------------------

export default function AppView() {

  const [users, setUsers] = useState([])
  const [schoolData, setSchoolData] = useState({});
  const [schools, setSchools] = useState([]);
  const isAdmin = window.location.pathname.split('/')[1] === 'admin';

  useEffect(() => {

    getUsersList().then((res) => {
      setUsers(res);
    })

    axios.get('/schools')
      .then((res) => setSchools(res.data)).catch((e) => console.log(e))
    axios.get('/get-dash-data')
      .then((res) => setSchoolData(res.data)).catch((e) => console.log(e))

  }, [])
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back  👋
      </Typography>

      <Grid container spacing={3}>


        {isAdmin && <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={users?.length}
            color="success"
            icon={<FaUser size={30} />}
          />
        </Grid>}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Classes"
            total={schoolData?.classes_count}
            color="success"
            icon={<FaChalkboardTeacher size={30} />}
          />
        </Grid>


        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Teachers"
            total={schoolData?.teachers_count}
            color="success"
            icon={<FaUser size={30} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Students"
            total={schoolData?.students_count}
            color="info"
            icon={<PiStudentBold size={30} />}
          />
        </Grid>

        {isAdmin && <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="School Admins"
            total={4}
            color="error"
            icon={<FaUserShield size={30} />}
          />
        </Grid>}

        {isAdmin && <div style={{ flexFlow: 'column', gap: "20px" }} className="charts flex">
          <Grid xs={12} md={6} lg={8}>
            <UserCharts />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <SalesChart />
          </Grid>
        </div>}

        {
          !isAdmin && <ChartComponent />
        }      </Grid>
    </Container>
  );
}
