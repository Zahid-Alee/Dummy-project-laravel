import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const SchoolChart = () => {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    axios.get('/schools') // Your API endpoint to fetch school data
      .then(response => {
        setSchoolData(response.data);
      })
      .catch(error => {
        console.error('Error fetching school data:', error);
      });
  }, []);

  const formatDataForPieChart = () => {
    const districtCounts = {};

    schoolData.forEach(school => {
      const districtName = school?.district?.name || 'Unknown';
      districtCounts[districtName] = (districtCounts[districtName] || 0) + 1;
    });

    const chartData = [['District', 'School Count']];
    for (const district in districtCounts) {
      chartData.push([district, districtCounts[district]]);
    }
    return chartData;
  };

  return (
    <div>
      <h2>Schools by District</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={formatDataForPieChart()}
        options={{
          title: 'Schools by District',
        }}
      />
    </div>
  );
};

export default SchoolChart;
