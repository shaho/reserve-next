import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";

import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function AddProductToCart({ user, productId }) {
  const router = useRouter();

  // ─── STATES ─────────────────────────────────────────────────────────────────────
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ─── SIDE EFFECTS ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let timeout;
    // if (success) {
    //   timeout = setTimeout(() => {
    //     return setSuccess(false);
    //   }, 3000);
    // }
    if (success) timeout = setTimeout(() => setSuccess(false), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  const handleAddToProduct = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      // console.log(payload);

      // Extra layer for security
      const token = cookie.get("token");
      const headers = {
        headers: {
          Authorization: token,
        },
      };

      await axios.put(url, payload, headers);

      setSuccess(true);
    } catch (error) {
      // console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  // ─── JSX ────────────────────────────────────────────────────────────────────────
  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      value={quantity}
      onChange={(event) => setQuantity(Number(event.target.value))}
      action={
        user && success
          ? {
              color: "blue",
              content: "Item Added!",
              icon: "plus cart",
              disabled: true,
            }
          : user
          ? {
              color: "orange",
              content: "Add to Cart",
              icon: "plus cart",
              loading: loading,
              disabled: loading,
              onClick: handleAddToProduct,
            }
          : {
              color: "blue",
              content: "Sign up to purchase",
              icon: "signup",
              onClick: () => router.push("/signup"),
            }
      }
    />
  );
}

export default AddProductToCart;
