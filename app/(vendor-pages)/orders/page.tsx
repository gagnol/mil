import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import OrderModel from '@/lib/order-model'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UpdateForm from '@/app/components/Admin-navigation/update-order'
import Sidebar from '@/app/components/Admin-navigation/sidebar'


export default async function orders() {

  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }


  await dbConnect()

  const NewOrders = (await OrderModel.find()
    .sort({
      _id: 1,
    }));
  const orders = JSON.parse(JSON.stringify(NewOrders))
  
  const totalorders = (await OrderModel.countDocuments({}))



  return (
    <div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid md:grid-cols-5 md:gap-5">
        <Sidebar />
        <div className="md:col-span-3">
          <div className="mx-auto max-w-2xl lg:max-w-7xl" >
            <div className="flex justify-between items-center">

              <h1 className="font-bold py-10 text-2xl ">Admin Orders</h1>
              <Toaster />
            </div>

            Total orders :  {totalorders}
            <table className="table text-center">
              <thead>
                <tr className='bg-base-200'>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No orders found</td>
                  </tr>
                ) : (
                  orders.map((order: any) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        <Image
                          src={order.productImage[0]}
                          alt={order.name}
                          width={50}
                          height={50}
                          className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
                        />
                      </td>
                      <td className='text-neutral-content'>{order.userId}</td>
                      <td className='text-bold'>{order.orderStatus}</td>
                      <td>
                        <UpdateForm
                          _id={order._id}
                          orderStatus={order.orderStatus}
                         
                        />
                      </td>
                    </tr>
                  ))
                )
                }
              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>
  )
}