"use client"
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'
import { checkDomainOfScale } from 'recharts/types/util/ChartUtils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}
const Chart = ({ salesData, productsData }: { salesData: any, productsData: any }) => {

  const salesDataMap = {
    labels: salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: '#333',
        backgroundColor: '#7480ff',
      },
    ],
  }

  const productsDataMap =  productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        )
   
  
  return (
   
       <div className="h-[450px] p-5 bg-neutral-400 rounded-lg w-[60%] ">
        <h2 className="mb-1 font-medium text-black">Daily transactions</h2>
        <Line data={salesDataMap} className='min-h-[350px]'/>
        </div>
    )
}

export default Chart