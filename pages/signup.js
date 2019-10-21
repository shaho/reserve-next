import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import axios from "axios";

import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  // ─── STATES ─────────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  // ─── SIDE EFFECTS ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const isUser = Object.values(user).every((element) => {
      return Boolean(element);
    });
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/signup`;
      const paylaod = { ...user };
      const response = await axios.post(url, paylaod);
      handleLogin(response.data);

      //
    } catch (error) {
      catchErrors(error, setError);

      //
    } finally {
      setLoading(false);
    }
  };

  // ─── JSX ────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Message
        attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{" "}
        instead.
      </Message>
    </>
  );
};

export default Signup;
