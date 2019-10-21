import { Segment, Card } from "semantic-ui-react";
import axios from "axios";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = ({ products }) => {
  // console.log(products);
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
};

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = {
    headers: { Authorization: token },
  };
  const response = await axios.get(url, payload);
  return {
    products: response.data,
  };
};

export default Cart;
