import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, Person, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);
  const isFaculty = Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY]);
  const isITSupport = Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT]);
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  // const isUser = Roles.userIsInRole(Meteor.userId(), [ROLE.USER]);
  return (
    <Navbar expand="lg" style={{ menuStyle, backgroundColor: '#75ABCF' }}>
      <Container>
        {isStudent || isFaculty || isITSupport || isOffice || isAdmin ? '' : ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_LANDING} as={NavLink} to="/">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ])}
        {isStudent ? ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_STUDENT_HOME} as={NavLink} to="/student-home">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ]) : ''}
        {isFaculty ? ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_FACULTY_HOME} as={NavLink} to="/faculty-home">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ]) : ''}
        {isITSupport ? ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_ITSUPPORT_HOME} as={NavLink} to="/itsupport-home">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ]) : ''}
        {isOffice ? ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_OFFICE_HOME} as={NavLink} to="/office-home">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ]) : ''}
        {isAdmin ? ([
          <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGO_ADMIN_HOME} as={NavLink} to="/admin-home">
            <span style={{ fontWeight: 700, fontSize: '18px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />Manoa Inventory</span>
          </Nav.Link>,
        ]) : ''}
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            { isOffice ? ([
            ]) : ''}
            <Nav.Link id={COMPONENT_IDS.NAVBAR_MAP} as={NavLink} to="/map" key="map">Map</Nav.Link>
            {isFaculty ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_STUDENT_SEARCH} as={NavLink} to="/student-list" key="student-list">Student List</Nav.Link>,
            ]) : ''}
            {isAdmin || isITSupport ? '' : ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_FACULTY_SEARCH} as={NavLink} to="/faculty" key="faculty">Faculty</Nav.Link>,
            ])}
            {isAdmin || isITSupport || isOffice ? '' : ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_CLUB_SEARCH} as={NavLink} to="/clubs" key="club">Clubs</Nav.Link>,
            ])}
            {isITSupport ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SEARCH_PORTS} as={NavLink} to="/ports" key="ports">Ports</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SEARCH_ROOMS} as={NavLink} to="/search-rooms" key="rooms">Rooms</Nav.Link>,
            ]) : ''}
            {isOffice || isITSupport || isFaculty || isStudent ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_ROOM_AVAILABILITY} as={NavLink} to="/availability" key="availability">Room Availability</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_RESERVE_ROOM} as={NavLink} to="/reserve" key="reserve">Reserve Room</Nav.Link>,
            ]) : ''}
            {isOffice || isFaculty || isStudent || isITSupport || isAdmin ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SERVICE_REQUEST} as={NavLink} to="/service" key="service">Service Request</Nav.Link>,
            ]) : ''}
            {isOffice || isITSupport || isAdmin ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_OFFICE_HOME} as={NavLink} to="/officeRequestHome" key="office-request">Request List</Nav.Link>,
            ]) : ''}
            {isFaculty ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SERVICE_REQUEST_ListE} as={NavLink} to="/requestList" key="navbar-service-request-list">Request List</Nav.Link>,
            ]) : ''}
            {isAdmin ? ([
              <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PROFILE} as={NavLink} to="/profile"><Person /> Profile</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
