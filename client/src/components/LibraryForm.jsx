import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap/';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const LibraryForm = () => {
  const location = useLocation();
  const { lat, lng } = location.state;
  const [formData, setFormData] = useState({
    address: "",
    lat: lat,
    lng: lng
  });
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    save(formData);
  };

  const save = (formData) => {
    const endpoints = {
      "LIBRARY": "http://localhost:3001/api/libraries"
    }

    axios.post(endpoints.LIBRARY, formData, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
    .then(response => {
      console.log("Our Response:", response.data);
      console.log("I'm the callback from the put call");
      navigate(`/library/${response.data.library.id}`)
    });
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label>Name/Address</Form.Label>
          <Form.Control
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            type="text"
            placeholder="Name/Address"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}


export default LibraryForm