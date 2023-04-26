import React, { useState } from 'react';
import { Container, Image, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Room } from '../../api/room/RoomCollection';

/** Render the map of the 3rd floor of POST. */
const MapDataComponent = () => {
  const [modalToShow, setModalToShow] = useState(null);

  const handleModalClose = () => setModalToShow(null);

  const { rooms } = useTracker((selector, options) => {
    const subscription = Room.subscribe();
    const rdy = subscription.ready();
    const roomProfiles = Room.find({}, options).fetch();
    return {
      rooms: roomProfiles,
      ready: rdy,
    };
  }, []);

  const handleClick = (room) => {
    setModalToShow(room);
  };

  /** Render the map of the 3rd floor of POST. */
  return (
    <Container>
      <Image src="/images/post_third_floor.png" id={PAGE_IDS.MAP} useMap="#floor-map" />
      <map name="floor-map">
        <area
          target="_self"
          alt="319"
          title="319"
          href="#"
          onClick={() => handleClick('319')}
          coords="632,428,805,587"
          shape="rect"
          className="map-area"
        />
      </map>
      <Modal show={modalToShow !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalToShow}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content for {modalToShow} goes here.</p>
          <h3>Room Information</h3>
          <p>Building Location: {rooms.location}</p>
          <p>Description: {rooms.description}</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Room's Resources/Equipment:</p>
          <p>Room Image: </p>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img src="https://media.gettyimages.com/id/1251629816/photo/the-perfect-setting-to-complete-work.jpg?s=612x612&w=gi&k=20&c=LEAfCAznv21Uds77_ovp-MI0DVJ5VVM-WSU897Xs71w=" alt="temporary room image" width="200px" height="200px" />
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/button-has-type */}
          <button onClick={handleModalClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MapDataComponent;
