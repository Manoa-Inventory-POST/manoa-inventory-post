import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import PeopleSearchResultsTable from './PeopleSearchResultsTable';
import RoomSearchResultsTable from './RoomSearchResultsTable';

const SearchBox = () => (
  <Accordion defaultActiveKey="0" className="rounded-0">
    <Accordion.Item eventKey="0" className="rounded-0">
      <Accordion.Header className="rounded-0 dashboard-header">Search Rooms</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <RoomSearchResultsTable />
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1" className="rounded-0 dashboard-header">
      <Accordion.Header className="rounded-0">Search People</Accordion.Header>
      <Accordion.Body className="rounded-0 text-black">
        <PeopleSearchResultsTable />
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2" className="rounded-0">
      <Accordion.Header className="rounded-0 dashboard-header">Search Equipment</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className="me-3">Schedule for:</Form.Label>
            <Form.Check inline label="person" name="group1" type="radio" id="phone-checkbox" />
            <Form.Check inline label="room" name="group1" type="radio" id="port-checkbox" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Building</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="any">ANY</option>
              <option value="POST">POST</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Room</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="any">ANY</option>
              <option value="POST">POST</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-dashboard">
            Search
          </Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);
export default SearchBox;
