import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { apiGet } from '../../services/api-service';

export default function AcceptedCalls() {
  const [chartData, setChartData] = useState({});

  const months = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };

  const chart = () => {
    const dateCalls = [];
    const qtyAnswered = [];
    apiGet('kpis').then((res) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const dataObj of res.data) {
        dateCalls.push(`${months[dataObj.current_month]} de ${dataObj.current_year} `);
        qtyAnswered.push(parseInt(dataObj.calls, 10));
      }
      setChartData({
        labels: dateCalls.reverse().slice(dateCalls.length - 12, dateCalls.length),
        datasets: [
          {
            label: 'Llamadas contestadas por asistentes al mes',
            data: qtyAnswered.reverse().slice(qtyAnswered.length - 12, qtyAnswered.length),
            backgroundColor: ['rgba(75, 192, 192, 0.6)'],
            borderWidth: 4,
          },
        ],
      });
    })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="App">
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: 'THICCNESS SCALE', display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  </div>
  );
}
