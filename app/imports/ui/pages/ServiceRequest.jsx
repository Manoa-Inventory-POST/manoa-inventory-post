import React, { useState } from 'react';
import { Form, Button, FormControl, Container, Row, Col, FormGroup } from 'react-bootstrap';

const ServiceRequest = () => {
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit the message to a server or database here
    const date = new Date().toLocaleString();
    setConfirmation(`Message submitted successfully at ${date}`);

    setMessage('');
  };


  return (
    <Container className="py-3">
      <Row>
        <Col className="text-center">
          <h2>Service Request</h2>
        </Col>
      </Row>
      <FormGroup>
        <h5>To:</h5>
        <FormControl
          type="text"
          value="Office"
          readOnly
          className="mx-auto my-1"
        />
        <h5>From:</h5>
        <FormControl
          type="text"
          value="johndoe@hawaii.edu"
          readOnly
          className="mx-auto my-1"
        />
        <h5>Request</h5>
        <Form onSubmit={handleSubmit} className="text-center">
          <FormControl
            as="textarea"
            rows="5"
            placeholder="Enter your request here"
            value={message}
            onChange={handleChange}
            className="mx-auto my-1"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </FormGroup>
      {confirmation && (
        <p className="text-center my-5">{confirmation}</p>
      )}
    </Container>
  );
};

export default ServiceRequest;
