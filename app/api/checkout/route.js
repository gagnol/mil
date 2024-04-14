import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: ["https://res.cloudinary.com/dps8xubee/image/upload/v1713101274/peimljwzlw8eylbkhl9m.png"],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
       product: body.items,
       user: body.email
    },
    mode: "payment",
  });


  return NextResponse.json(session);
}
