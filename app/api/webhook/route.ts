import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request): Promise<Response> {
  const body = await request.text();
  const headersList = headers(); // No arguments needed here
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig as string, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });

  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;

      // guardar en una base de datos
      console.log(  "Consultado producto con id" );

      // enviar un correo

      console.log({ checkoutSessionCompleted });
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
