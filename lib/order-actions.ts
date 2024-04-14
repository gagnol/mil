"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { redirect } from 'next/navigation';
import User from './user-model'
import dbConnect from './db-connect'
import Order from './order-model';
import Product from './product-model';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Math.round(Number(order.totalAmount) * 100);
  const productName = JSON.stringify(order?.productName?.map((item: any) => item))
  const productId = JSON.stringify(order?.productId?.map((item: any) => item))
  const quantity = JSON.stringify(order?.quantity?.map((item: any) => item))
  const productImage = JSON.stringify(order?.productImage?.map((item: any) => item))

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: productName,
              

            }
          },
         quantity:1

        },
      ],
      metadata: {
        productName:productName,
        productImage:productImage,
        productId: productId,
        quantity:quantity,
        userId: order.email,
      },
      payment_method_types: ["card"],
    
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await dbConnect();

    // Verifica y actualiza el stock para cada producto en la orden
    for (const productId of order.productId) {
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error(` ${productId} not found`);
      }

      // Asumiendo que en tu tipo de datos, la cantidad también está directamente en la orden
      if (product.countInStock < Number(order.quantity)) {
        throw new Error(`Out of stock ${productId}`);
      }

      const newCountInStock = product.countInStock - Number(order.quantity);

      // Actualiza el campo countInStock en la base de datos
      await Product.findByIdAndUpdate(productId, { countInStock: newCountInStock });
    }

    // Crea la nueva orden
    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};


//GET YOUR LAST ORDER

export const getLastOrder = async () => {
  try {
    await dbConnect();

    const yourOrder = await Order.find().sort({ createdAt: 'desc' }).limit(1);

    return JSON.parse(JSON.stringify(yourOrder));
  } catch (error) {
    console.log(error);
  }
}


// UPDATE ORDER
export async function updateOrder(prevState: any, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    orderStatus:z.string().min(1),
   
  });

  const parse = schema.safeParse({
    _id: formData.get('_id'),
    orderStatus:formData.get('orderStatus')
   
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid' };
  }

  const data = parse.data;

  try {
    await dbConnect();
  
    // Use { new: true } to return the modified document
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: data._id },
      {orderStatus : `deliver at ${new Date().toISOString()}` },
      { new: true }
    );
     // Check if the order was found and updated successfully
    if (!updatedOrder) {
      console.log({ message: `Order not found for id ${data._id}` });
      return { message: `Order not found for id ${data._id}` };
    }
    revalidatePath('/');
    console.log({ message: `Update order ${data._id}` });
    return JSON.parse(JSON.stringify(updatedOrder)),{ message: `Update order ${data._id}` };
  } catch (e) {
    console.error(e); // Log the actual error for debugging
    return { message: 'Failed to update order' };
  }
}
