'use client'

import { updateUser } from '@/lib/user-action'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function UpdateForm({session}:any) {

  const [state, formAction] = useFormState(updateUser, {
    message: '',
  })
  const { pending } = useFormStatus()
  
  const { userInfo } = useSelector((state: any) => state.next);

  return (
             
        <div className="py-5">
          <h1 className="tex-2xl font-bold pm-4">Update your personal information</h1>
          <form
            action={async (formData) => {
              const res = await updateUser(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
            <div className='flex gap-16 '>
            <div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={session?.user?.name}
              />
            </div>
              <input
                type="hidden"
                id="email"
                name="email"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={session?.user?.email}
              />
           
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="a_input"
                required
                autoComplete='false'
                defaultValue=""
              />
            </div>
            </div>
            <div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={userInfo?.user.address}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={userInfo?.user.city}
              />
              </div>
              <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="postal">Postal</label>
              <input
                type="text"
                id="postal"
                name="postal"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={userInfo?.user.postal}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                className="a_input"
                required
                autoComplete='false'
                defaultValue={userInfo?.user.country}
              />
              </div>
              </div>
              </div>
            <button type="submit" disabled={pending} className="btn btn-primary btn-outline">
              Upate
            </button>
          </form>
        </div>

  )
}