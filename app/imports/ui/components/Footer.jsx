import React from 'react';
import { Container } from 'react-bootstrap';
import { Github, Instagram, Facebook, GeoAltFill } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px', color: 'white' };
  const linkStyle = { color: 'white', textDecoration: 'none' };
  const iconLinkStyle = { color: 'white', fontSize: '30px', textDecoration: 'none' };
  return (
    <footer className="mt-auto" style={{ backgroundColor: '#75ABCF' }}>
      <Container style={divStyle} align="center">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h4>About Us</h4>
              <hr />
              <p>
                Manoa Inventory: POST is a web application allowing users to find what they are looking for on the third floor of POST building.
              </p>
            </div>
            <div className="col-sm-4">
              <h4>Services</h4>
              <hr />
              <a style={linkStyle} href="https://bowfolios.github.io"><GeoAltFill /> Map</a>
              <br />
              <a style={linkStyle} href="https://bowfolios.github.io">Professors</a>
              <br />
              <a style={linkStyle} href="https://bowfolios.github.io">Room Availability</a>
              <br />
              <a style={linkStyle} href="https://bowfolios.github.io">Reserve Room</a>
              <br />
              <a style={linkStyle} href="https://bowfolios.github.io">Service Request</a>
            </div>
            <div className="col-sm-4">
              <h4>Resources</h4>
              <hr />
              <a style={linkStyle} href="https://bowfolios.github.io">Office Hours Spreedsheet</a>
              <br />
              <a style={linkStyle} href="https://bowfolios.github.io">Port Number Spreedsheet</a>
            </div>
          </div>
        </div>
        <hr />
        <div className="pb-3 col-sm-4">
          <h4>Contact Us</h4>
          <a style={iconLinkStyle} href="https://bowfolios.github.io"> <Github /></a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={iconLinkStyle} href="https://bowfolios.github.io"> <Instagram /></a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={iconLinkStyle} href="https://bowfolios.github.io"> <Facebook /></a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
