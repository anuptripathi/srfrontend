"use client";

import checkout from "./actions/checkout";
import getStripe from "./stripe";
import { SolidButton } from "../common/components/Buttons";

interface CheckoutProps {
  productId: string;
}

export default function Checkout({ productId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(productId);
    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId: session.data.id });
  };

  return (
    <SolidButton className="max-w-[25%]" onClick={handleCheckout}>
      Buy Now
    </SolidButton>
  );
}
