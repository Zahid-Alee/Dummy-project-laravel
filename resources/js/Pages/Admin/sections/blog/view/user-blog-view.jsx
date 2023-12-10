import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from '../../../_mock/blog';

import Iconify from '../../../components/iconify';

// import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import BasicModal from '@/Components/BasicModal';
import { useEffect, useState } from 'react';
// import CreatePlanForm from '../CreatePlanForm';
import PackageCard from '../post-card';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function UserBlogView({ view = false }) {
  const [open, setOpen] = useState(false);
  const [features, setAllFeatures] = useState([]);
  const [plans, setPlans] = useState([]);
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {

    // const timer = setInterval(() => {

    //   const container = document.querySelector('.grid-plans-container');
    //   const divsInContainer = container.querySelectorAll('div');
    //   if (divsInContainer.length > 1) {
    //     clearInterval(timer);
    //   }
    //   divsInContainer?.forEach((div) => {
    //     if (div.innerHTML.trim() === '') {
    //       div.remove();
    //     }
    //   });

    // }, 100);



    axios.get('/plans').then(async (res) => {
      setPlans(res.data);
      console.log(res.data)
      await axios.get('/api/features')
        .then(response => {
          setAllFeatures(response.data);
        })
        .catch(error => {
          console.error('Error fetching features:', error);
        });
    }).catch(() => {
      console.log('error');
    })

  }, []);

  return (
    <Container>
      {!view && <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>
        <Button onClick={() => setOpen(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Package
        </Button>
      </Stack>}
      {/* <BasicModal open={open} close={handleClose}>
        <CreatePlanForm features={features} onClose={() => { setOpen(false) }} />
      </BasicModal> */}
      {!view && <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>}

      <div className='grid-plans-container' >
        {plans?.length > 0 && plans?.map((plan, index) => (
          <PackageCard view={view} plan={plan} features={features} key={index} >
          </PackageCard>
        ))}
      </div>
    </Container>
  );
}