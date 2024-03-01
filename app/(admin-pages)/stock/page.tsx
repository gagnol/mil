
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UpdateForm from '@/app/components/Admin-navigation/update-stock'
import Sidebar from '@/app/components/Admin-navigation/sidebar'
import ProductModel from '@/lib/product-model'
import Image from 'next/image'

export default async function Stock() {

    const session = await getServerSession();

    if (session?.user?.email !== "admin@example.com") {
      redirect("/")
    }
    await dbConnect()

    const NewStock = (await ProductModel.find()
      .sort({
        _id: 1,
      }));
    const stocks = JSON.parse(JSON.stringify(NewStock))
  
     

return(
<div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="md:col-span-3">
          <div className="mx-auto max-w-2xl lg:max-w-7xl" >
            <div className="flex justify-between items-center">
              <h1 className="font-bold py-10 text-2xl ">Admin Stock Control</h1>
              <Toaster />
            </div>
           
            <table className="table text-center ">
              <thead>
                <tr className='bg-base-200'>
                  <th>Image</th>
                  <th>Id</th>
                  <th>Stock</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                {stocks.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No prodcuts found</td>
                  </tr>
                ) : (
                  stocks 
                  .filter((item:any) => item.countInStock < 10)
                  .sort((a:any,b:any)=>a.countInStock-b.countInStock)
                  .map((stock: any) => (
                    <tr key={stock._id} >
                      <td><Image 
                    src={stock.image[0]}
                    alt={stock.name}
                    width={100}
                    height={100}
                    className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
                  /></td>
                      <td>{stock._id}</td>
                      <td>
                        {stock.countInStock}
                      </td>
                      <td className='text-neutral-content'>{stock.name.substring(0,10)}</td>
                  <td><UpdateForm  
                   _id={stock._id}
                   stock={stock.countInStock}
                          /> </td>
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