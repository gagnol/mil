'use client'
import {  updateStock } from '@/lib/action'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export default function UpdateForm({
  _id,
 stock
}: {
  _id: string
  stock: number
}) {

  const [state, formAction] = useFormState(updateStock, {
    message: '',
  })
  const { pending } = useFormStatus()
  console.log(formAction)
  
  return (
    <div>
      <button
        className="btn btn-primary btn-outline"
        onClick={() =>
          (document.getElementById('my_modal_3')! as any).showModal()
        }
      >
        Update Stock
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2 className="tex-2xl font-bold pm-4">Update Stock</h2>
          <form
            action={async (formData) => {
              const res = await updateStock(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
            <input type="hidden" name="_id" value={_id} />
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Stock</label>
              <input
                type="text"
                id="stock"
                name="stock"
                className="a_input"
                required
                autoComplete='false'
              />
            </div>
            <button type="submit" disabled={pending} className="btn btn-primary 
            btn-outline mx-10">
              Upate
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-outline"
              onClick={() =>
                (document.getElementById('my_modal_3') as any).close()
              }
            >
              Back
            </button>
  
          </form>
        </div>
      </dialog>
    </div>
  )
}