'use client'

import { updateReview } from '@/lib/user-action'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Rating from '../rating'

export default function ReviewForm({ session, product }: any) {

  const [state, formAction] = useFormState(updateReview, {
    message: '',
  })
  const { pending } = useFormStatus()

  const [rating, setRating] = useState<number | null>(null);

  // Function to handle checkbox selection
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  return (
    <div className="py-5">
      <p >Review this product</p>
      <p className='text-neutral-400 text-[14px] my-2'>
        Share your thoughts with other customers
      </p>
      <h1 className="tex-2xl font-bold pm-4">Post your review</h1>
      <form
        action={async (formData) => {
          const res = await updateReview(null, formData)
          toast.success(res.message, { duration: 4000, position: "top-center", })

        }}          >
        <div className="form-control w-full max-w-xs py-4">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="  bg-neutral px-[7px] py-[3px] mb-2
                border-[#949494] border-[1px] rounded-[3px] font-extralight"
            required
            autoComplete='false'

          />
        </div>
        <input
          type="hidden"
          id="produtcId"
          name="productId"
          defaultValue={product._id}
        />
        <input
          type="hidden"
          id="email"
          name="email"
          defaultValue={session?.user?.email}
        />
        <input
          type="hidden"
          id="name"
          name="name"
          defaultValue={session?.user?.name}
        />
        <input
          type="hidden"
          id="avatar"
          name="avatar"
          defaultValue={session?.user?.image}
        />
        <div className="form-control w-full max-w-xs py-4">
          <label htmlFor="review">Your review</label>
          <textarea
            rows={10}
            cols={32}
            id="review"
            name="review"
            className=' bg-neutral px-[7px] py-[3px] mb-2 text-white
                border-[#949494] border-[1px] rounded-[3px] font-extralight resize-none'
            required
            autoComplete='false'
            defaultValue=""
          />

        </div>
        <div className="form-control w-full max-w-xs py-4">
          <h3>Your rating</h3>
          <Rating value={rating || 0} />
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <React.Fragment key={value}>
                <label htmlFor={`rating_${value}`} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rating_${value}`}
                    name="rating"
                    value={value}
                    onChange={() => handleRatingChange(value)}
                    checked={rating === value}
                    className="mr-1"
                  />
                  {value}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary btn-outline w-[50%]">
          Post review
        </button>
      </form>
    </div>

  )
}

