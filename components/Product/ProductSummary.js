import { Item, Label } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";

const ProductSummary = ({ _id, name, mediaUrl, price, sku }) => {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default ProductSummary;
