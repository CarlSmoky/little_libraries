import React, {useState} from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap/';
import { useLocation } from "react-router-dom";
import axios from "axios";

const LibraryForm = () => {
  const location = useLocation();
  const { lat, lng } = location.state;
  const [formData, setFormData] = useState({
    address: "",
    lat: lat,
    lng: lng
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
      event.preventDefault();
    save(formData);
  };


  function save(formData) {
    const endpoints = {
      "LIBRARY": "http://localhost:3001/api/libraries"
    }

    axios.post(endpoints.LIBRARY, formData)
      .then(response => {
        console.log("Our Response:", response.data);
        console.log("I'm the callback from the put call");
      });
    }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group  controlId="validationCustom01">
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
        {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Lat</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Latitude"
            defaultValue={lat}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Lng</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Longtitude"
            defaultValue={lng}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group> */}
      </Row>    
      <Button type="submit">Submit form</Button>
    </Form>
  );
}


export default LibraryForm