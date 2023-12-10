import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get('/api/get-sales-data') // Your API endpoint to fetch sales data
      .then(response => {
        setSalesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const formatDataForPieChart = () => {
    const dataForPieChart = salesData?.reduce((acc, sale) => {
      const { title } = sale?.plan??'';
      acc[title] = acc[title] ? acc[title] + 1 : 1;
      return acc;
    }, {});

    const formattedData = [['Plan', 'Sales']];
    for (const planTitle in dataForPieChart) {
      formattedData.push([planTitle, dataForPieChart[planTitle]]);
    }
    return formattedData;
  };

  return (
    <div>
      <h2>Plans Sold</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={formatDataForPieChart()}
        options={{
          title: 'Plans Sold',
        }}
      />
    </div>
  );
};

export default SalesChart;
