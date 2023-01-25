import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const SearchBox = () => (
  <Accordion defaultActiveKey="0" className="rounded-0">
    <Accordion.Item eventKey="0" className="rounded-0">
      <Accordion.Header className="rounded-0 dashboard-header">Search Spaces</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <Form>
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Minimum Capacity</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Maximum Capacity</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Equipment</Form.Label><br />
            <Form.Check inline label="phone" name="group1" type="checkbox" id="phone-checkbox" />
            <Form.Check inline label="network ports" name="group1" type="checkbox" id="port-checkbox" />
            <Form.Check inline label="monitor" name="group1" type="checkbox" id="port-checkbox" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Available From</Form.Label>
            <Form.Control type="datetime-local" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Available Until</Form.Label>
            <Form.Control type="datetime-local" placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-dashboard">
            Search
          </Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1" className="rounded-0 dashboard-header">
      <Accordion.Header className="rounded-0">Search People</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Role</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="any">ANY</option>
              <option value="POST">Professor</option>
              <option value="POST">TA</option>
              <option value="POST">RA</option>
              <option value="POST">Student Advisor</option>
              <option value="POST">Undergraduate Student</option>
              <option value="POST">Graduate Student</option>
            </Form.Select>
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
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-dashboard">
            Search
          </Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2" className="rounded-0">
      <Accordion.Header className="rounded-0 dashboard-header">Search Schedules</Accordion.Header>
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
