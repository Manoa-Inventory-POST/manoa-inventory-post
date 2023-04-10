import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const roomData = [
  { room: '303A', occupant: '' },
  { room: '303B', occupant: '' },
  { room: '303C', occupant: '' },
  { room: '303D', occupant: '' },
  // add more rooms and occupants as needed
];

const AssignFac = () => {
  // const [occupant, setOccupant] = useState('');
  const [setOccupant] = useState('');

  const handleOccupantChange = (event) => {
    setOccupant(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-center">Room Occupancy</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Occupant</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((room, index) => (
            <tr key={index}>
              <td>{room.room}</td>
              <td>
                <Form.Select
                  aria-label={`Occupant for room ${room.room}`}
                  value={room.occupant}
                  onChange={handleOccupantChange}
                >
                  <option value="">Choose Occupant</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Bob Johnson">Bob Johnson</option>
                  <option value="Sarah Lee">Sarah Lee</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignFac;
