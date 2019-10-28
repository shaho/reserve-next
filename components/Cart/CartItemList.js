import { Header, Segment, Button, Icon, Item } from "semantic-ui-react";
import { useRouter } from "next/router";

const CartItemList = ({ products, user }) => {
  const router = useRouter();

  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  const mapCartProductsToItems = (products) => {
    return products.map((item) => {
      return {
        childKey: item.product._id,
        header: (
          <Item.Header
            as="a"
            onClick={() => router.push(`/product?_id=${item.product._id}`)}
          >
            {item.product.name}
          </Item.Header>
        ),
        image: item.product.mediaUrl,
        meta: `${item.quantity} x $${item.product.price}`,
        fluid: "true",
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => console.log(item.product._id)}
          />
        ),
      };
    });
  };

  // ─── CHECK PRODUCTS ARRAY ───────────────────────────────────────────────────────

  // if "products" array is empty
  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  // else...
  return <Item.Group divided items={mapCartProductsToItems(products)} />;
};

export default CartItemList;
