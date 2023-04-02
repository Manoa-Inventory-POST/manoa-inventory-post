import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import SearchStudentItem from '../components/SearchStudentItem';

/* Renders a table containing all of the Student documents. Use <SearchStudentItem> to render each row. */
const SearchStudents = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentsFirstName, setStudentsFirstName] = useState('');
  const [studentsLastName, setStudentsLastName] = useState('');
  const [studentsEmail, setStudentsEmail] = useState('');

  /* Connecting with default */
  const { ready, students } = useTracker(() => {
    const sub1 = StudentProfiles.subscribe();
    const rdy = sub1.ready();
    const studentItems = StudentProfiles.find({}).fetch();
    return {
      students: studentItems,
      ready: rdy,
    };
  }, []);

  // set faculty in filteredFaculty when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredStudents(students);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = students;
    if (studentsFirstName) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(studentsFirstName.toLowerCase()); });
    }
    if (studentsLastName) {
      filtered = filtered.filter(function (obj) { return obj.lastName.toLowerCase().includes(studentsLastName.toLowerCase()); });
    }
    if (studentsEmail) {
      filtered = filtered.filter(function (obj) { return obj.position.toLowerCase().includes(studentsEmail.toLowerCase()); });
    }
    setFilteredStudents(filtered);
  }, [studentsFirstName, studentsLastName, studentsEmail]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Student Search</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.STUDENT_FILTER_OPTIONS}>
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
                      onChange={e => setStudentsFirstName(e.target.value)}
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
                      onChange={e => setStudentsLastName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by role">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Email
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setStudentsEmail(e.target.value)}
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
            <th>Name</th>
            <th>Email</th>
            <th>Standing</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          { filteredStudents.length === 0 ? (<tr><td>-</td></tr>) : filteredStudents.map((members) => <SearchStudentItem key={members._id} student={members} />)}
        </tbody>
      </Table>
      { filteredStudents.length === 0 ? <div className="d-flex justify-content-center pb-2">No students found.</div> : '' }
    </div>
  );
  return (
    <Container id={PAGE_IDS.STUDENT_SEARCH}>
      <div className="justify-content-center">
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

export default SearchStudents;
