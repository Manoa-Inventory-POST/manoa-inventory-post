import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const StudentHome = () => (
  <div>
    <div className="student-home-page-background">
      <h1> MĀNOA INVENTORY: POST</h1>
      <div id="about-summary">
        <h3>This is a HOME of ICS STUDENT</h3>
      </div>
    </div>
    <Container id={PAGE_IDS.STUDENT_HOME}>
      <section>
        <div className="container px-5 my-5">
          <div className=" mb-5 mb-lg-0">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection" /></div>
            <h2 className="h4 fw-bolder text-center">Searching for Faculty</h2>
            <br />
            <p>
              Allows your self to search for faculty information and office hours on the 3rd floor of POST Building.
              As an undergraduate student I want to be able to look up my professor by name to find out his or her office hours and location.
            </p>
            <a className="text-decoration-none" href="/faculty">
              Click Here
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </section>
    </Container>
  </div>
);

export default StudentHome;
