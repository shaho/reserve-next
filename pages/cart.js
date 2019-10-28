import { Segment } from "semantic-ui-react";
import axios from "axios";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = ({ products, user }) => {
  return (
    <Segment>
      <CartItemList user={user} products={products} />
      <CartSummary products={products} />
    </Segment>
  );
};

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;

  // The following line add an extra security layer to app
  const headers = {
    headers: { Authorization: token },
  };
  const response = await axios.get(url, headers);

  return {
    products: response.data,
  };
};

export default Cart;
