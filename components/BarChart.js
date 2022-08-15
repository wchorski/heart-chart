import React, { useState } from 'react'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


import { FakeData } from '../config/fakeData'

export const BarChart = () => {

  const [dataState, setdataState] = useState({
    labels: FakeData.map(data => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: FakeData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  })


  return (
    <div>

      <h1>O - BarChart - O</h1>
      <Bar data={dataState}/>
      
    </div>
  )
}
