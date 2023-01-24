import React from 'react';
import { Col, Container, Image, Row, Button} from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { NavLink } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
/*const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to this template</h1>
        <p>Now get to work and modify this app!</p>
      </Col>

    </Row>
  </Container>
);*/

const Landing = () => (
  <div className="landing-page-background">
    <h1> MANOA INVENTORY: POST</h1>
    <div id="sign-up-button">
      <h3>New User?</h3>
      <Button  as={ NavLink } exact to="/signup" variant="primary" size="large">Sign up</Button>
    </div>
    <div id="log-in-button">
      <h3>Already have an account?</h3>
      <Button as={NavLink} to="/signin" variant="success" size="large">Log in</Button>
    </div>
  </div>
)

export default Landing;
