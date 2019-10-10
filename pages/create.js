import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
};

const CreateProduct = () => {
  // ─── STATES ─────────────────────────────────────────────────────────────────────
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);

  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct((prevState) => {
        return { ...prevState, media: files[0] };
      });
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  };
  // ─── JSX ────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small" />

        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />

        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
};

export default CreateProduct;
