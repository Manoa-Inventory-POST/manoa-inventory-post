import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import ProfileTemplate from '../pages/ProfileTemplate';
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileTemplate /></ProtectedRoute>} />
        <Route path="/list" element={<ProtectedRoute><ListStuff /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} />
        <Route path="/edit/:_id" element={<ProtectedRoute><EditStuff /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><ListStuffAdmin /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/**
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  // console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

/**
 * FacultyProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and faculty role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const FacultyProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isFaculty = Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isFaculty) ? children : <Navigate to="/notauthorized" />;
};

/**
 * OfficeProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and office role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const OfficeProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isOffice) ? children : <Navigate to="/notauthorized" />;
};

/**
 * ITSupportProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and IT support role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ITSupportProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isITSupport = Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isITSupport) ? children : <Navigate to="/notauthorized" />;
};

/**
 * AdvisorProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and advisor role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdvisorProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdvisor = Roles.userIsInRole(Meteor.userId(), [ROLE.ADVISOR]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdvisor) ? children : <Navigate to="/notauthorized" />;
};

/**
 * TAProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with TA attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const TAProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  const isTA = Meteor.userID().TA;
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isTA) ? children : <Navigate to="/notauthorized" />;
};

/**
 * RAProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with RA attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const RAProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  const isRA = Meteor.userID().RA;
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isRA) ? children : <Navigate to="/notauthorized" />;
};

/**
 * GraduateProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role with graduate attribute before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const GraduateProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  const isGraduate = Meteor.userID().graduate;
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent && isGraduate) ? children : <Navigate to="/notauthorized" />;
};

/**
 * StudentProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and student role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isStudent) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

FacultyProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

FacultyProtectedRoute.defaultProps = {
  children: <Landing />,
};

OfficeProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

OfficeProtectedRoute.defaultProps = {
  children: <Landing />,
};

ITSupportProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ITSupportProtectedRoute.defaultProps = {
  children: <Landing />,
};

AdvisorProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdvisorProtectedRoute.defaultProps = {
  children: <Landing />,
};

TAProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

TAProtectedRoute.defaultProps = {
  children: <Landing />,
};

RAProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

RAProtectedRoute.defaultProps = {
  children: <Landing />,
};

GraduateProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

GraduateProtectedRoute.defaultProps = {
  children: <Landing />,
};

StudentProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

StudentProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
