import App from "next/app";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";

import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Get possible cookie
    const { token } = parseCookies(ctx);

    let pageProps = {};

    // Retreiving each page's props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // ─── TOKEN ───────────────────────────────────────────────────────
    // Check for token
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        // Prepare and pass Authorization to get user back
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;

        // ─── USER ROLE ───────────────────────────────────────────────
        // Check the user role
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        // If authenticated, but not of role "admin" or "root",...
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        // ... redirect from "/create" page
        if (isNotPermitted) redirectUser(ctx, "/");
        // ─── END USER ROLE ───────────────────────────────────────────

        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);

        // Handling inavlid token
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
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
