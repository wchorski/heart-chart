import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export const HeartChart = forwardRef(({ importData, playerOne }, ref) => {

  useImperativeHandle(ref, () => ({
    updateChart() {
      formatData(importData)
    },
  }))


  const [dataState, setdataState] = useState()

  const formatData = (dtArray) => {

    const plyrOneIndex = dtArray.findIndex(usr => usr._id === playerOne._id)

    dtArray[plyrOneIndex] = playerOne;

    const fmtData = {
      labels: dtArray.map(data => data.name),
      datasets: [
        {
          label: "Heart count",
          data: dtArray.map(data => data.heartCount),
          backgroundColor: dtArray.map(data => data.color),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }

    setdataState(fmtData)
  }


  useEffect(() => {

    formatData(importData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importData])


  return (
    <>
      {dataState && (
        <div>
          <div className="chart-cont" style={{ maxWidth: "40em" }}>
            <Pie data={dataState} options={{ cutout: "10%" }} />
          </div>
        </div>

      )}
    </>
  )
})
HeartChart.displayName = "HeartChart"