import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const ChartComponent = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    fetch('/school-charts')
      .then(response => response.json())
      .then(data => {
        const { labels: barLabels, data: barData } = data.bar_chart_data;
        const formattedBarChartData = [['Months', 'Classes Created'], ...barLabels.map((label, index) => [label, barData[index]])];
        setBarChartData(formattedBarChartData);

        const formattedLineChartData = [['Months', 'Students Enrolled'], ...Object.entries(data.pie_chart_data).map(([label, value]) => [label, value])];
        setLineChartData(formattedLineChartData);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Bar Chart: Classes Created</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={barChartData}
        options={{
          title: 'Classes Created by Month',
          // Additional chart options
        }}
      />
      
      <h2>Line Chart: Students Enrolled</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={lineChartData}
        options={{
          title: 'Students Enrolled by Month',
          // Additional chart options
        }}
      />
    </div>
  );
};

export default ChartComponent;
