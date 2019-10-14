import App from "next/app";
import { parseCookies } from "nookies";
import axios from "axios";

import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Get possible cookie
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    //
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
      }
    }

    return {
      pageProps: pageProps,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
