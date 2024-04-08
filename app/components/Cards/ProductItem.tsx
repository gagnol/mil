import { Product } from '@/lib/product-model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import  Rating  from '../rating'

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card card-compact w-96 bg-neutral-800 shadow-xl mb-4">
      <figure>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image[0]}
            alt={product.name}
            width={200  }
            height={200}
            className="w-64 h-64 my-5 max-h-64 min-h-64 max-w-64 min-w-64"
            
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-normal text-white">{product.name.substring(0,100)}</h2>
        </Link>
        <Rating value={product.rating}  />
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">${product.price}</span>
        </div>
      </div>
    </div>
  )
}
