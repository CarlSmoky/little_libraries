import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';
import axios from 'axios';
import { authContext } from '../providers/AuthProvider';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(authContext);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const authInput = {
    email,
    password
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate(authInput);
  }

  const authenticate = (authInput) => {
    const endpoints = {
      "LOGIN": "http://localhost:3001/api/login"
    }

    axios.post(endpoints.LOGIN, authInput)
      .then(response => {
        console.log("Our Response:", response.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
        }
        const { id, firstName, lastName, email, auth } = response.data;
        setUserInfo(id, firstName, lastName, email, auth);
        navigate('/')
      });
  }

  return (
    <div>
      <div className='form-wrapper'>
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
          <Form.Group className="mb-3 form-checkbox" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out"/>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!validateForm()}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
};

export default Login;
