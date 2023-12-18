import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from '../app-widget-summary';
import SalesChart from './SalesData';
import UserCharts from './RegisteredUsers';
import { FaDollarSign, FaMap, FaMapMarked, FaSalesforce, FaSearchLocation, FaTags, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function AppView() {

  const [data, setData] = useState();

  useEffect(() => {

    axios.get('/get-all-data').then((res) => setData(res.data))
  }, [])



  return (
    <Container maxWidth="xl">

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Plans"
            total={data?.plans_count}
            color="success"
            icon={<FaTags size={29} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={data?.users_count}
            color="info"
            icon={<FaUser size={29} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Plas Sold"
            total={data?.sold_plans_count}
            color="error"
            icon={<FaDollarSign />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Washing  Points"
            total={data?.washing_points_count}
            color="error"
            icon={<FaMapMarked />}
          />
        </Grid>

        <div style={{ flexFlow: 'column', gap: "20px" }} className='charts flex'>
          <div className="plan-chart">
            <UserCharts />
          </div>

          <div className="sale-chart">
            <SalesChart />
          </div>
        </div>

      </Grid>
    </Container>
  );
}
