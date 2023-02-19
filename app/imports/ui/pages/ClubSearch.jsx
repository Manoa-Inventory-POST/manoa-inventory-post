// import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import ClubItem from '../components/ClubItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const ClubSearch = () => {
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [clubInterests, setClubInterests] = useState([]);

  const ready = true;
  const clubs = [
    {
      name: 'Association for Computing Machinery (ACM)',
      website: 'https://acmanoa.github.io/',
      description: 'We are a registered student chapter of the Association for Computing Machinery as well as a recognized student-chartered registered independent organization (RIO) at the University of Hawaii at Manoa. ' +
        'We welcome students of all different backgrounds, interests, and skill levels to join our community and share our passion for computer science.',
      interests: ['RIO', 'Networking', 'Professional Development', 'Technical Workshops'],
      picture: 'https://acmanoa.github.io/assets/img/officers/placehold.png',
    },
    {
      name: 'Programming AND Algorithms (PANDA)',
      website: 'https://acmanoa.github.io/',
      description: 'PANDA (Programming AND Algorithms) is a special interest group of ACM Manoa dedicated to studying and applying algorithms. ' +
        'We aim to help students develop the algorithmic problem solving skills needed to succeed in the field of computer science.',
      interests: ['SIG', 'Algorithms', 'Technical Workshops'],
      picture: 'https://acmanoa.github.io/assets/img/logos/Panda.png',
    },
    {
      name: 'Grey Hats',
      website: 'https://acmanoa.github.io/greyhats/',
      description: 'The Grey Hats is a student-led, extracurricular organization focused on real-world training for cyber defense. ' +
        'Membership gives students an outstanding opportunity to learn and apply critical skills, attack and defend systems, and to network with others interested in modern security issues.',
      interests: ['SIG', 'Cybersecurity', 'Networking', 'Competitions'],
      picture: 'https://acmanoa.github.io/assets/img/logos/greyhats.png',
    },
    {
      name: 'Game Dev',
      website: 'https://acmanoa.github.io/gamedev/',
      description: 'We are a group dedicated to designing, building, and demoing video games using Unity and other various tools.',
      interests: ['SIG', 'Art', 'Animation', 'Video Games', 'Game Design'],
      picture: 'https://acmanoa.github.io/assets/img/logos/gamedev.png',
    },
    {
      name: 'ICSpark',
      website: 'https://icspark.github.io/index.html',
      description: 'ICSpark is a Registered Independent Organization (RIO) at the University of Hawaii. We are a group of students who offer free coding classes every Saturday for students through the 6th - 12th grade.',
      interests: ['RIO', 'Mentor', 'Teaching'],
      picture: 'https://acmanoa.github.io/assets/img/logos/icspark.PNG',
    },
    {
      name: 'Supporting Women in Technology Computing Hawaii (SWITCH)',
      website: 'https://switch-uhm.github.io/',
      description: 'SWITCH (Supporting Women in Technology Computing Hawaii) is the culmination of efforts of the awesome students, faculty, and working professionals supporting social change in the ICS department. ' +
        'We strive to provide useful resources from these organizations to improve your professional, technical, and personal development.',
      interests: ['SIG', 'Professional Development', 'Guest Speakers', 'Career Opportunities'],
      picture: 'https://acmanoa.github.io/assets/img/logos/switchlogo.png',
    },
  ];
  /*
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
  // set club in filteredClubs when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredClubs(clubs);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = clubs;
    if (clubInterests) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(facultyFirstName.toLowerCase()); });
    }
    setFilteredClubs(filtered);
  }, [clubInterests]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Search Faculty</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.FACULTY_FILTER_OPTIONS}>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by interests">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Interests
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setClubInterests(e.target.value)}
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
            <th>Website</th>
            <th>Description</th>
            <th>Interests</th>
          </tr>
        </thead>
        <tbody>
          { filteredClubs.length === 0 ? (<tr><td>-</td></tr>) : filteredClubs.map((items) => <ClubItem key={items._id} faculty={items} />)}
        </tbody>
      </Table>
      { filteredClubs.length === 0 ? <div className="d-flex justify-content-center pb-2">No clubs found.</div> : '' }
    </div>
  );
  return (
    <Container id={PAGE_IDS.CLUB_SEARCH}>
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

export default ClubSearch;
