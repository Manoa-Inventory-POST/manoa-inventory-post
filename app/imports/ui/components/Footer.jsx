import React from 'react';
import { Container } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px', color: 'white' };
  const linkStyle = { color: 'white', textDecoration: 'none' };

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#75ABCF' }}>
      <Container style={divStyle} align="center">
        <div className="container">
          <div className="row pb-2">
            <div className="col-sm-4">
              <h5>About Us</h5>
              <hr />
              <p>
                Manoa Inventory: POST is a web application allowing users to find what they are looking for on the third floor of POST building.
              </p>
            </div>
            <div className="col-sm-4">
              <h5>Services</h5>
              <hr />
              <a style={linkStyle} href="/map"><GeoAltFill /> Map</a>
              <br />
              <a style={linkStyle} href="/faculty">Faculty</a>
              <br />
              <a style={linkStyle} href="/clubs">Clubs</a>
              <br />
              <a style={linkStyle} href="/signin">Room Availability</a>
              <br />
              <a style={linkStyle} href="/signin">Reserve Room</a>
              <br />
              <a style={linkStyle} href="/signin">Service Request</a>
            </div>
            <div className="col-sm-4">
              <h5>Resources</h5>
              <hr />
              <a style={linkStyle} href="https://manoa-inventory-post.github.io/">Visit our Home Page</a>
              <br />
              <a style={linkStyle} href="https://github.com/Manoa-Inventory-POST/manoa-inventory-post">GitHub Repository</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
