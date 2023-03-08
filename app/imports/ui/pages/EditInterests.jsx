import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import { Room } from '../../api/room/RoomCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const bridge = new SimpleSchema2Bridge(Room._schema);

/* Renders the EditStuff page for editing a single document. */
const EditInterests = () => (
  <div>
    <h1>Edit Interests</h1>
    <Form schema={bridge} onSubmit={e => { e.preventDefault(); }}>
      <Form.Group controlId="newInterest">
        <Form.Label>New Interest</Form.Label>
        {/*          <Form.Control
            type="text"
            placeholder="Enter new interest"
            value={newInterest}
            onChange={e => setNewInterest(e.target.value)}
          /> */}
      </Form.Group>
      {/* <Button variant="primary" type="submit" onClick={handleAddInterest}>
        Add Interest
      </Button> */}
    </Form>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      {/*<tbody>
        {interests.map((interest, index) => (
          <tr key={interest._id}>
            <td>{index + 1}</td>
            <td>{interest.name}</td>
            <td>
              <Button variant="danger" onClick={() => handleDeleteInterest(interest._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>*/}
    </Table>
  </div>
);

export default EditInterests;
