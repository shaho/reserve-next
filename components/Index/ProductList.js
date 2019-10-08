import { Card } from "semantic-ui-react";

const ProductList = ({ products }) => {
  const mapProductsToItems = (products) => {
    return products.map((product) => {
      return {
        header: product.name,
        image: product.mediaUrl,
        meta: `$${product.price}`,
        color: "teal",
        fluid: true,
        childKey: product._id,
        href: `/product?_id=${product._id}`,
      };
    });
  };

  return (
    <Card.Group
      stackable
      itemsPerRow="3"
      centered
      items={mapProductsToItems(products)}
    />
  );
};

export default ProductList;
