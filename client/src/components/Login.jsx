import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const authInput = {
    email,
    password
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    auth(authInput);
  }

  const auth = (authInput) => {
    const endpoints = {
      "LOGIN": "http://localhost:3001/api/login"
    }

    axios.post(endpoints.LOGIN, authInput)
      .then(response => {
        console.log("Our Response:", response.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
        }
        navigate('/')
      });
  }

  const userAuthenticated = () => {
    const endpoints = {
      "JWT": "http://localhost:3001/api/test"
    }
    axios.get(endpoints.JWT, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
      {true && <Button onClick={userAuthenticated}>Auth</Button>}
    </div>
  )
};

export default Login;
