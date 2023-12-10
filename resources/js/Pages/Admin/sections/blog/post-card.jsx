import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Chip } from '@mui/material';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import BasicModal from '@/Components/BasicModal';
import axios from 'axios';

const PackageCard = ({ plan, features, view }) => {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const isFeatureIncluded = (featureId) => {

    return plan.features.some(feature => feature.id === featureId);

  };


  const formatCreatedAtDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };



  const hanldeBookNow = async () => {
    // setOpen(true);
    // setId(id);
    await axios.post(`/subscribe/${plan.id}`).then((res) => {
      console.log(res.data);

    })
      .catch((e) => {
        console.log(e)
      })
  }

  return (<>
    <Card className='max-w-sm' style={{padding:'20px',minWidth:"300px"}}>
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{plan.title}</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/Wash</span>
      </div>
      <ul className="my-7 space-y-5">
        {features?.map((feature, i) => (
          <li className={`flex space-x-3 ${!isFeatureIncluded(feature.id) && 'line-through decoration-gray-500'}`} key={i}>
            <svg
              className={`h-5 w-5 shrink-0  ${isFeatureIncluded(feature.id) ? ' text-cyan-600 dark:text-cyan-500' : 'text-gray-400 dark:text-gray-500'} `}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <button onClick={hanldeBookNow}
        type="button"
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
      >
        Choose plan
      </button>
    </Card>
  
    <BasicModal open={open} close={() => { setOpen(false) }} >

    </BasicModal>
  </>
  )
};

export default PackageCard;
