import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

/** Renders general User information */
const UserInfoItem = ({ user }) => (
  <Col className="align-content-center text-center">
    <Row>
      <h2 id="user-name">{user.firstname} {user.lastname}</h2>
    </Row>
  </Col>
);

/** Require a document to be passed to this component. */
UserInfoItem.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export {
  UserInfoItem,
};
