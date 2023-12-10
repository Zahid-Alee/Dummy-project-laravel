import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const UserCharts = () => {
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    axios.get('/api/get-users-registered') // Replace with your actual endpoint
      .then(response => {
        setRegistrationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user registration data:', error);
      });
  }, []);

  const formatDataForLineGraph = () => {
    if (!registrationData) return [];

    const formattedData = registrationData.map(data => {
      return [`${data.year}-${data.month}`, data.user_count];
    });

    return [['Month', 'User Count'], ...formattedData];
  };

  return (
    <div>
      <h2>Users Registered Per Month</h2>
      {registrationData && (
        <Chart
          width={'800px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={formatDataForLineGraph()}
          options={{
            title: 'Users Registered Per Month',
            hAxis: {
              title: 'Month',
            },
            vAxis: {
              title: 'User Count',
            },
          }}
        />
      )}
    </div>
  );
};

export default UserCharts;
