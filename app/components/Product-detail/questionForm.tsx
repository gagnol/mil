'use client'

import { submitQuestion } from '@/lib/user-action'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export default function UpdateForm({product}:any) {

  const [state, formAction] = useFormState(submitQuestion, {
    message: '',
  })
  const { pending } = useFormStatus()
  

  return (
             
    <div className='max-w-screen-2xl py-5 ml-20'>
      <h4 className='text-neutral-400 text-[14px] my-2'>Don&apos;t se the aswer are you looking for</h4>
          <h1 className="tex-2xl font-bold pm-4">Post your question</h1>
          <form
            action={async (formData) => {
              const res = await submitQuestion(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
             <input
                type="hidden"
                id="produtcId"
                name="productId"
                defaultValue={product._id}
              />
           <div className="form-control w-full max-w-xs py-4">
                        
              <input
                type="text"
                id="title"
                name="title"
                className="a_input"
                required
                autoComplete='false'
                defaultValue=""
                />
            </div>
            <button type="submit" disabled={pending} className="btn btn-primary btn-outline">
              Submit Question
            </button>
          </form>
        </div>

  )
}