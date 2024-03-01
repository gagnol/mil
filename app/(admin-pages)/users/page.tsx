import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import UserModel from '@/lib/user-model'
import DeleteForm from '../../components/Admin-navigation/delete-user'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Admin-navigation/sidebar'


export default async function Users({searchParams}:
  {searchParams:{[key:string]:string |string }}) {
  
    const session = await getServerSession();

    if( session?.user?.email !== "admin@example.com")    
    {
      redirect("/")
    }

     
  const query=searchParams.query||'';
  await dbConnect()

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
  const users = (await UserModel.find({
    name: { $regex: new RegExp(query, 'i') }, // Use a case-insensitive regular expression for searching
  })
  .skip(perPage * (page - 1))
  .limit(perPage)
  .sort({
    _id: 1,
  })) ;
 
 const totalusers= (await UserModel.countDocuments({})) 

 const totalPages = Math.ceil(totalusers / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
	
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="max-w-screen-2xl mx-auto my-10">
    <div className="grid md:grid-cols-5 md:gap-5">
    <Sidebar/>
    <div className="md:col-span-3">
    <div className="mx-auto max-w-2xl lg:max-w-7xl" >
      <div className="flex justify-between items-center">
       
        <h1 className="font-bold py-10 text-2xl ">Admin users</h1>
        <Toaster />
        </div>
     
     Total users :  {totalusers}
      <table className="table text-center">
        <thead>
          <tr className='bg-base-200'>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          ) : (
            users.map((user:any) => (
              <tr key={user._id}>
                <td>
              
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={100}
                    height={100}
                    className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
                  />
                
                </td>
                <td className='text-neutral-content'>{user.name}</td>
                <td className='text-bold'>{user.email}</td>
                
                <td>
                  <DeleteForm
                    _id={user._id.toString()}
                    name={user.name}
                  />
                </td>
              </tr>
            ))
          )
           }
        </tbody>
      </table>
      <div className="flex justify-center items-center my-16">
          <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
            {page === 1 ? (
              <button className="join-item btn btn-outline opacity-40" aria-disabled="true">
                Previous
              </button>
            ) : (
              <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                 <button className="join-item btn btn-outline">
                Previous
                </button>
              </Link>
            )}
            {pageNumbers.map((pageNumber, index) => (
              <Link
                key={index}
                className={
                  page === pageNumber
                    ? "join-item btn btn-square"
                    : "hover:join-item btn btn-square btn-primary"
                }
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}
            {page === totalPages ? (
              <button className="join-item btn btn-outline opacity-40" aria-disabled="true">
                Next
              </button>
            ) : (
              <Link href={`?page=${nextPage}`} aria-label="Next Page">
                <button className="join-item btn btn-outline">
                Next
                </button>
              </Link>
            )}
          </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}