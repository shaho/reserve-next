import React, { useEffect } from "react";
import axios from "axios";

const Home = ({ products }) => {
  console.log(products);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  return {
    products: response.data,
  };
};

export default Home;
