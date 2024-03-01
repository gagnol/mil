"use client"

import {
    BarChart, Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];
  
  const Chart = () => {
    return (
        <div className="h-[450px] p-5 bg-neutral-400 rounded-lg">
        <h2 className="mb-5 font-medium text-black">Monthly Sales</h2>  
        <ResponsiveContainer width="100%" height="90%" >
          <BarChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="80%" stopColor="#7480ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7480ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="black" />
            <CartesianGrid strokeDasharray="3 3" />
                 <Tooltip />
            <Bar
              type="monotone"
              dataKey="Total"
              stroke="#7480ff"
              fillOpacity={1}
              fill="url(#total)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default Chart;