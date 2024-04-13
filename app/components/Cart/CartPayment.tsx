 "use client"
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkoutOrder, createOrder } from '@/lib/order-actions';
import { useEffect } from "react";
import Link from "next/link";

interface CartItem {
  discountPrice: number;
  quantity: number;
  shipping: number;
  totalPrice: number;
}


const CartPayment = () => {
 
  const router = useRouter();

  const { productData, userInfo } = useSelector(
    (state: any) => state.next
  );

  const subTotal = (
    productData.reduce(
      (acc: number, item: CartItem) =>
        acc + item.discountPrice * item.quantity, 0
    )
  );
  
  
  const totalAmount = subTotal + productData.shipping
  

  
// Stripe payment
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const { data: session } = useSession();

useEffect(() => {
  if (!session || !session.user) {
    router.push('/signin');
  }
  if(!userInfo){
    router.push('/signin');
  }
  if (userInfo.user?.address === "") {
   
    router.push('/profile')
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [session]);
 
const onCheckout = async () => {
  const order  = {
    quantity:productData.map((item:any) => item.quantity),
    productId:productData.map((item:any) => item._id),
    productImage:productData.map((item:any) => item.image),
    productName:productData.map((item:any) => item.name.substring(0,10)),
    subTotal,
    totalAmount,
    email: session?.user?.email || "",
    userId:session?.user?.name || "",
    shippingInfo:userInfo.user.address+","+userInfo.user.city+","+userInfo.user.postal+","+userInfo.user.country|| ""
  }

  await checkoutOrder(order);
  await createOrder(order)
}

  return (
    <div className="flex flex-wrap flex-col gap-3 min-w-full bg-neutral">
      <div className="rounded-md border mt-5 p-2 text-white">      
      <h1>Dirección de entrega</h1>
      <h2>Dirección:&nbsp;{userInfo?.user.address}</h2>
      <h2>Ciudad:&nbsp;{userInfo?.user.city}</h2>
      <h2>Código Postal:&nbsp;{userInfo?.user.postal}</h2>
      
      <Link href="/profile">
        <p className="text-primary cursor hover:text-secondary">Actualizá tu dirección de envío</p>
      </Link>
      </div>
      <p className="flex items-center justify-between px-1 font-semibold text-white">
        SubTotal: {" "}(
        {Math.ceil(
          productData.reduce((a: number, c: CartItem) => a + c.quantity, 0)
        )}{" "}
        items)
        <span className="font-bold text-xl text-white">€{subTotal}</span>
      </p>
      
      <p className="text-white">
        Costos de envio:<span className="float-right pr-1">€{productData.shipping}</span>
      </p>
      <p className="flex items-center justify-between px-1 font-semibold border-t text-white">
        Total:{" "}
        <span className="font-bold text-xl pt-1 text-white">€{Math.ceil(totalAmount)}</span>
      </p>
      <div className="flex flex-col items-center">
      <form action={onCheckout} method="post">
        <button
          type="submit"
          className="btn btn-primary btn-outline w-full"
        >
          Comprar ahora
        </button>
        </form>
      </div>
    </div>
  );
};

export default CartPayment;
