// import { Meteor } from 'meteor/meteor';
// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
// import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { Col, Row, Table, Container, Dropdown, DropdownButton } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import FacultyItem from '../components/FacultyItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const FacultySearch = () => {
  const ready = true;
  const facultyProfiles = [
    {
      firstName: 'Carleton', lastName: 'Moore', role: 'Assistant Professor', picture: 'images/cam-moore.jpg', office: 'POST 307B', phone: '808-956-6920', email: 'cmoore@hawaii.edu',
    },
    {
      firstName: 'Philip', lastName: 'Johnson', role: 'Professor', picture: 'images/philip-johnson', office: 'POST 326', phone: '808-956-7639', email: 'toddtt@hawaii.edu',
    },
    {
      firstName: 'Jason', lastName: 'Leigh', role: 'Professor', picture: '/images/jason-leigh.jpg', office: 'POST 327', phone: '808-956-4989', email: 'leighj@hawaii.edu',
    },
    {
      firstName: 'Henri', lastName: 'Casanova', role: 'Professor', picture: '/images/henri-casanova.jpg', office: 'POST 303B', phone: '808-956-8249', email: 'henric@hawaii.edu',

    },
  ];
  const [sortingBy, setSortingBy] = useState('lastName');
  facultyProfiles.sort((a, b) => a[sortingBy].localeCompare(b[sortingBy]));
  /*
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [facultyFirstName, setFacultyFirstName] = useState('');
  const [facultyLastName, setFacultyLastName] = useState('');
  const [facultyRole, setFacultyRole] = useState('');
  const [facultyRoom, setFacultyRoom] = useState('');
  const { ready, faculty } = useTracker(() => {
    const subscription = Meteor.subscribe(FacultyProfiles.userPublicationName);
    const rdy = subscription.ready();
    const facultyItems = FacultyProfiles.collection.find({}).fetch();
    return {
      faculty: facultyItems,
      ready: rdy,
    };
  }, []);
  */
  /*
  // set recipes in filteredRecipies when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredFaculty(faculty);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = faculty;
    if (facultyFirstName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(facultyFirstName.toLowerCase()); });
    }
    if (facultyLastName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(facultyLastName.toLowerCase()); });
    }
    if (facultyRole) {
      filtered = filtered.filter(function (obj) { return obj.servingSize.toString() === facultyRole.toString(); });
    }
    if (facultyRoom) {
      filtered = filtered.filter(function (obj) { return obj.estimatedTime.toString() === facultyRoom.toString(); });
    }
    setFilteredFaculty(filtered);
  }, [facultyFirstName, facultyLastName, facultyRole, facultyRoom]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Search Faculty</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by recipe name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      First Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter a recipe"
                      onChange={e => setFacultyFirstName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by recipe name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Last Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter a recipe"
                      onChange={e => setFacultyLastName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by serving size">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Role
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a serving size"
                      onChange={e => setFacultyRole(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by time">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Room
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a time"
                      onChange={e => setFacultyRoom(e.target.value)}
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
*/
  /*
  const returnList = () => (
    <div>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          { filteredFaculty.length === 0 ? (<tr><td>-</td></tr>) : filteredFaculty.map((members) => <FacultyItem key={members._id} faculty={members} />)}
        </tbody>
      </Table>
      { filteredFaculty.length === 0 ? <div className="d-flex justify-content-center">No faculty found.</div> : '' }
    </div>
  );
  return (
    <Container id="search-recipe-page">
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
   */
  return (ready ? (
    <Container id={PAGE_IDS.FACULTY_SEARCH} className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <Col className="text-center">
            <h2>Faculty Search</h2>
          </Col>
          <Col style={{ display: 'flex' }}>
            <DropdownButton id={COMPONENT_IDS.FACULTY_SEARCH_SORT} title="Sort by">
              <Dropdown.Item onClick={() => setSortingBy('firstName')}>First Name</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortingBy('lastName')}>Last Name</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortingBy('role')}>Role</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortingBy('office')}>Office</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortingBy('phone')}>Phone</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortingBy('email')}>Email</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Table hover>
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>
                <th>Contact Info</th>
                <th>Office</th>
              </tr>
            </thead>
            <tbody>
              {facultyProfiles.map((profile) => <FacultyItem key={profile._id} faculty={profile} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Faculty Information" />);
};

export default FacultySearch;
