import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import FacultyItem from '../components/FacultyItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const FacultySearch = () => {
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [facultyFirstName, setFacultyFirstName] = useState('');
  const [facultyLastName, setFacultyLastName] = useState('');
  const [facultyRole, setFacultyRole] = useState('');
  const [facultyOffice, setFacultyOffice] = useState('');

  /* Connecting with default */
  const { ready, faculty } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFaculty();
    const rdy = subscription.ready();
    const facultyItems = FacultyProfiles.find({}).fetch();
    return {
      faculty: facultyItems,
      ready: rdy,
    };
  }, []);

  // set faculty in filteredFaculty when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredFaculty(faculty);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = faculty;
    if (facultyFirstName) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(facultyFirstName.toLowerCase()); });
    }
    if (facultyLastName) {
      filtered = filtered.filter(function (obj) { return obj.lastName.toLowerCase().includes(facultyLastName.toLowerCase()); });
    }
    if (facultyRole) {
      filtered = filtered.filter(function (obj) { return obj.role.toLowerCase().includes(facultyRole.toLowerCase()); });
    }
    if (facultyOffice) {
      filtered = filtered.filter(function (obj) { return obj.office.toLowerCase().includes(facultyOffice.toLowerCase()); });
    }
    setFilteredFaculty(filtered);
  }, [facultyFirstName, facultyLastName, facultyRole, facultyOffice]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Faculty Search</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.FACULTY_FILTER_OPTIONS}>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by first name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      First Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFacultyFirstName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by last name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Last Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFacultyLastName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by role">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Role
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Professor"
                      onChange={e => setFacultyRole(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by room">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Office
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter a room number"
                      onChange={e => setFacultyOffice(e.target.value)}
                    />
                  </label>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th> </th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact Info</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          { filteredFaculty.length === 0 ? (<tr><td>-</td></tr>) : filteredFaculty.map((members) => <FacultyItem key={members._id} faculty={members} />)}
        </tbody>
      </Table>
      { filteredFaculty.length === 0 ? <div className="d-flex justify-content-center pb-2">No faculty found.</div> : '' }
    </div>
  );
  return (
    <Container id={PAGE_IDS.FACULTY_SEARCH}>
      <div className="d-flex justify-content-center">
        <Row id="dashboard-screen">
          <Col className="mx-3">
            <Row id="dashboard-filter">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list">{returnList()}</Row> : '' }
            { ready ? '' : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FacultySearch;
