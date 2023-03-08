import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Container } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import { Room } from '../../api/room/RoomCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import FacultyItem from '../components/FacultyItem';
import PeopleSearchResultsTableRow from '../components/PeopleSearchResultsTableRow';

const bridge = new SimpleSchema2Bridge(Room._schema);

/* Renders the EditStuff page for editing a single document. */
const EditInterests = () => (
  <Container>
    <div>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Room</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          hi
        </tbody>
      </Table>
    </div>
  </Container>
);

export default EditInterests;
