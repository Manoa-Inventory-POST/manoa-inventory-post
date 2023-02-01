import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Render the map of the 3rd floor of POST. */
const Map = () => (
  // <Container className="map-page-background" id={PAGE_IDS.MAP} style={{ height: '900px' }}>
  <Container>
    <Image src="/images/POST3rd.jpeg" id={PAGE_IDS.MAP} style={{ width: '100%' }} />
  </Container>
);

export default Map;
