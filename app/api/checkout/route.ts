import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request:any) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: body.name,
            images: ["https://res.cloudinary.com/dps8xubee/image/upload/v1713101274/peimljwzlw8eylbkhl9m.png"],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["ES"]
    },
    metadata: {
       product: JSON.stringify(body.items.map((item:any) => item._id)), 
       name: JSON.stringify(body.items.map((item:any) => item.name)),
       image: JSON.stringify(body.items.map((item:any) => item.image)),
       prices: JSON.stringify(body.items.map((item:any) => item.price)),
       shipping: JSON.stringify(body.items.map((item:any) => item.shipping)),
       quantity: JSON.stringify(body.items.map((item:any) => item.quantity)),
       user: body.email
    },
    mode: "payment",

  });

  return NextResponse.json(session);
}
