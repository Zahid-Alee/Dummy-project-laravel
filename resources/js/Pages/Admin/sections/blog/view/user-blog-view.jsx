
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
// import CreatePlanForm from '../CreatePlanForm';
import PackageCard from '../post-card';
import axios from 'axios';

export default function UserBlogView({ plans, view = false }) {
  const [open, setOpen] = useState(false);
  const [features, setAllFeatures] = useState([]);
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {

    const timer = setInterval(() => {

      const container = document.querySelector('.grid-plans-container');
      const divsInContainer = container.querySelectorAll('div');
      if (divsInContainer.length > 1) {
        clearInterval(timer);
      }
      divsInContainer?.forEach((div) => {
        if (div.innerHTML.trim() === '') {
          if (!div) return
          div.remove();
        }
      });

    }, 100);


    axios.get('/api/features')
      .then(response => {
        setAllFeatures(response.data);
      })
      .catch(error => {
        console.error('Error fetching features:', error);
      });

  }, []);

  return (
    <Container>


      <div className='grid-plans-container' >
        {plans?.length > 0 && plans?.map((plan, index) => (
          <PackageCard  plan={plan} features={features} key={index} >
          </PackageCard>
        ))}
      </div>
    </Container>
  );
}
