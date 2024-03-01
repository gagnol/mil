'use client'
import { updateAnswer } from '@/lib/action'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export default function UpdateForm({
  _id,
  description
}: {
  _id: string
  description: string
}) {

  const [state, formAction] = useFormState(updateAnswer, {
    message: '',
  })
  const { pending } = useFormStatus()

  return (
    <div>
      <button
        className="btn btn-primary btn-outline"
        onClick={() =>
          (document.getElementById('my_modal_3')! as any).showModal()
        }
      >
        Update Answer
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2 className="tex-2xl font-bold pm-4">Update Answer</h2>
          <form
            action={async (formData) => {
              const res = await updateAnswer(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
            <input type="hidden" name="_id" defaultValue={_id} />
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Answer</label>
              <input
                type="text"
                id="description"
                name="description"
                className="a_input"
                required
                autoComplete='false'
              />
            </div>
            <button type="submit" disabled={pending} className="btn btn-primary btn-outline">
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