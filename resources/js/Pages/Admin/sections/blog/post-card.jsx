import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Chip } from '@mui/material';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import BasicModal from '@/Components/BasicModal';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// import './stripe.css'
import toast, { Toaster } from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const stripe = await stripePromise;


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



  const hanldeBookNow = async (e) => {
    await axios.post(`/subscribe/${plan.id}`)
      .then((res) => {
        toast.success('Request for this plan has been submitted');
      }).catch((e) => console.log(e))

  };



  return (<>
    <Toaster />
    <Card className='max-w-sm' style={{ padding: '20px', minWidth: "300px" }}>
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{plan.title}</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">Rs.</span>
        <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/Wash</span>
      </div>
      <ul className="my-7 space-y-5">
        {features?.map((feature, i) => (
          isFeatureIncluded(feature.id) && <li className={`flex space-x-3`} key={i}>
            <svg
              color='black'
              className={`h-5 w-5 shrink-0  ${isFeatureIncluded(feature.id) ? ' text-black-600 dark:text-black-500' : 'text-gray-400 dark:text-gray-500'} `}
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
        style={{ backgroundColor: 'black' }}
      >
        Choose plan
      </button>
    </Card>

    <BasicModal open={open} close={() => { setOpen(false) }} >
      <div id='stripe'>
        <Elements stripe={stripePromise}>
          <form>
            <CardElement
            />
            <button style={{ width: 'fit-content', color: 'white', backgroundColor: "black", margin: '20px auto' }} type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </Elements>;
      </div>

    </BasicModal>
  </>
  )
};

export default PackageCard;
