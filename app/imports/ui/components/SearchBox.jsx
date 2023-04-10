import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import PeopleSearchResultsTable from './PeopleSearchResultsTable';
import RoomSearchResultsTable from './RoomSearchResultsTable';
import ClubSearchResultsTable from './ClubSearchResultsTable';
import PortSearchResultsTable from './PortSearchResultsTable';

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
      <Accordion.Header className="rounded-0 dashboard-header">Search Ports</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <PortSearchResultsTable />
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3" className="rounded-0">
      <Accordion.Header className="rounded-0 dashboard-header">Search Clubs</Accordion.Header>
      <Accordion.Body className="rounded-0">
        <ClubSearchResultsTable />
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);
export default SearchBox;
