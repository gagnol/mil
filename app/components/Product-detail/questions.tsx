'use client'
import toast from 'react-hot-toast'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { submitLike } from '@/lib/user-action'
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'

function Questions({ questionProducts }: any) {
  
  const [state, formAction] = useFormState(submitLike, {
    message: '',
  })
  const { pending } = useFormStatus()
  return (

    <div className='max-w-screen-2xl pb-2 ml-10'>
      <div className='flex flex-wrap justify-start '>
        <div className='w-[100%]' >
          <h2 className="text-[21px] pl-4 font-semibold pt-1">
            Customer questions & answers
          </h2>

          {questionProducts?.map((item: any) => (
            <ul key={item._id} >
              <li key={item.title}>
                <div className='flex flex-wrap justify-start my-5 mx-2 p-2' >
                  <div className=' w-[90px] border-r-2 border-gray-400'>
                    <div className='px-4'>
                      <form
                       action={async (formData) => {
                        const res = await submitLike(null, formData)
                        toast.success(res?.message||"upps", { duration: 4000, position: "top-center", })
              
                      }}          
                      >
                        <input type="hidden" name="_id" id='_id' defaultValue={item._id} />
                        
                        <button type="submit" disabled={pending} className="btn btn-ghost">
                          <FaCaretUp className='text-[25px] text-[#777] hover:text-[#c45500] 
                          cursor-pointer'/>
                        </button>
                      </form>
                    </div>
                   <div className='text-center'>
                      <span > {item.likes.length} </span>
                      <br />
                      <span>votes</span>
                    </div>
                    <div className='px-4'>
                      <button className='btn btn-ghost'>
                        <FaCaretDown className='text-[25px] text-[#777] 
                        hover:text-[#c45500] cursor-pointer' />
                      </button>
                    </div>
                  </div>
                  <div className='block justify-start w-[50%] mx-5' >
                    <div>
                      <span className="font-bold">Question:</span>
                      <span className='text-primary '>&nbsp;{item.title}</span>
                    </div>
                    <br />
                    <div >
                      <span className="font-bold">Answer:</span>
                      <span> &nbsp; &nbsp;
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          )).slice(0, 7)
          }

        </div>

      </div>
    </div>

  )
}

export default Questions