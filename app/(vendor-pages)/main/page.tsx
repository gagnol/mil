import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Chart from "@/app/components/Admin-navigation/chart"
import Chart2 from "@/app/components/Admin-navigation/chart2"
import Sidebar from "@/app/components/Admin-navigation/sidebar";
import Transactions from "@/app/components/Admin-navigation/transactions";
import OrderModel from '@/lib/order-model'
import ProductModel from '@/lib/product-model'
import UserModel from '@/lib/user-model'
import dbConnect from '@/lib/db-connect'
import Rightbar from "@/app/components/Admin-navigation/rightbar";


export default async function Main() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/")
  }


  await dbConnect()

  const ordersCount = await OrderModel.countDocuments()
  const productsCount = await ProductModel.countDocuments()
  const usersCount = await UserModel.countDocuments()

  const ordersPriceGroup = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalAmount' },
      },
    },

  ])

  const formattedSales = ordersPriceGroup[0]?.sales.toFixed(2) || '0.00';

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%d-%m', date: '$createdAt' } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$totalAmount' }
      },
    },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        totalSales: { $round: ['$totalSales', 2] } // Round to 2 decimal places
      }
    },
    { $sort: { _id: 1 } },
  ]);


  const totalProductsCount = await ProductModel.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
      },
    },
  ]);

  const totalProducts = totalProductsCount.length > 0 ? totalProductsCount[0].totalProducts : 0;

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        totalProducts: 1,
        percentage: {
          $multiply: [
            { $divide: ['$totalProducts', totalProducts] },
            100,
          ],
        },
      },
    },
    { $sort: { percentage: -1 } },
  ]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto my-10">
        <div className="grid md:grid-cols-5 md:gap-4">
          <Sidebar />
        
          <div className="md:col-span-3">
            <h1 className="mb-4 text-[28px] font-extrabold">Admin Dashboard</h1>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">${formattedSales} </p>
                  <p>Sales</p>
                  <Link href="/admin/orders" className="hover:text-primary">View sales</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">{ordersCount} </p>
                  <p>Orders</p>
                  <Link href="/orders" className="hover:text-primary">View orders</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">{productsCount} </p>
                  <p>Products</p>
                  <Link href="/admin/products" className="hover:text-primary">View products</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">{usersCount} </p>
                  <p>Users</p>
                  <Link href="/admin/users" className="hover:text-primary">View users</Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
            </div>
            <div className="flex gap-1">
              <Chart salesData={salesData} productsData={productsData} />
              <div className="h-[450px] w-[40%] p-5 bg-neutral-400 rounded-lg xl:block md:hidden">
                <h2 className="mb-1 font-medium text-black">Department contribution</h2>
                <table className=" text-center">
                  <thead>
                    <tr className="text-neutral text-center">
                      <th>Department</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>

                    {productsData.map((item: any) => (
                      <tr key={item.category}>
                        <td >
                          <span className="text-[#666] font-semibold">{item.category}
                          ({item.totalProducts})  &nbsp;</span>
                        </td>
                        <td>
                          <span className="text-black font-bold justify-end"> {item.percentage.toFixed(2)}%</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Transactions />
          <Chart2 />
          </div>
          <div className="md:col-span-1">
          <Rightbar/>
          </div>
      </div>
    </div >
    </>
  )
}