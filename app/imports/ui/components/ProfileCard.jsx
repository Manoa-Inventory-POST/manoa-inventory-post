import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';

/* Component for layout out a Profile Card. */

const ProfileCard = (props) => {

  const { userToUpdate, bridge } = props;

  console.log(userToUpdate);

  const submit = (data) => {

    const { _id, email, firstName, lastName, phones, officeHours, role, phoneIds, clubAdvisorIds } = data;
    const phonesArray = phones.split(', ');
    let collectionName;
    let updateData;

    switch (role) {
    case 'ADMIN':
      updateData = { id: _id, firstName, lastName, email, phones: phonesArray, phoneIds };
      collectionName = AdminProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'FACULTY':
      updateData = { id: _id, firstName, lastName, email, officeHours, phones: phonesArray, phoneIds, clubAdvisorIds };
      collectionName = FacultyProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Faculty updated successfully', 'success');
        });
      break;
    case 'USER':
      updateData = { id: _id, firstName, lastName, email, phones: phonesArray, phoneIds };
      collectionName = UserProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    case 'STUDENT':
      updateData = { id: _id, firstName, lastName, email, phones: phonesArray, phoneIds };
      collectionName = StudentProfiles.getCollectionName();
      console.log('updateData:');
      console.log(updateData);
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Student updated successfully', 'success');
        });
      break;
    case 'OFFICE':
      updateData = { id: _id, firstName, lastName, email, phones: phonesArray, phoneIds };
      collectionName = OfficeProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'OFFICE updated successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
      updateData = { id: _id, firstName, lastName, email, phones: phonesArray, phoneIds };
      collectionName = ITSupportProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'ITSUPPORT updated successfully', 'success');
        });
      break;
    default:
      break;
    }
  };

  return (
    <Container className="py-3" id={PAGE_IDS.PROFILE_UPDATE}>
      <Row className="justify-content-center">
        <Col className="col-lg-16">
          <hr />
          <Row className="text-center"><h2>{userToUpdate.firstName}&apos;s Profile</h2></Row>
          <hr />
          <br />
          <Row>
            <Col className="col-lg-3">
              <td><Image alt="" src={userToUpdate.picture} width="180" height="180" /></td>
            </Col>
            <Col className="col-lg-8">
              <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userToUpdate}>
                <Card>
                  <Card.Body>
                    <div className="row">
                      <TextField
                        className="col-md-6"
                        name="firstName"
                        placeholder="Your first name (required)"
                      />
                      <TextField
                        className="col-md-6"
                        name="lastName"
                        placeholder="Your last name (required)"
                      />
                    </div>
                    <div className="row">
                      <TextField className="col-md-6" name="email" placeholder="Your email (required)" readOnly />
                      <TextField
                        id={COMPONENT_IDS.PROFILE_FORM_PHONE}
                        className="col-md-6"
                        name="phones"
                        placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155"
                      />
                    </div>
                    <div className="row">
                      <TextField className="col-md-6" name="role" placeholder="select role (required)" readOnly />
                      <TextField className="col-md-6" name="office" placeholder="Your office rooms" readOnly />
                    </div>
                    <div className="row">
                      <TextField className="col-md-6" name="picture" placeholder="Your pic" />
                    </div>
                    <TextField className="col-md-6" name="picture" plplaceholderaceholder="Your pic" />
                    <HiddenField name="password" value="changeme" />
                    <HiddenField name="clubAdvisorIds" />
                    <HiddenField name="phoneIds" />
                    <SubmitField id={COMPONENT_IDS.PROFILE_FORM_SAVE} value="Save" />
                    <ErrorsField />
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

ProfileCard.propTypes = {
  userToUpdate: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    clubAdvisorIds: PropTypes.arrayOf(PropTypes.string),
    phoneIds: PropTypes.arrayOf(PropTypes.string),
    occupantRoomIds: PropTypes.arrayOf(PropTypes.string),
    role: PropTypes.string,
    office: PropTypes.string,
    phones: PropTypes.string,
    officeHours: PropTypes.string,
    picture: PropTypes.string,
    position: PropTypes.string,
    TA: PropTypes.bool,
    RA: PropTypes.bool,
    graduate: PropTypes.bool,
    undergraduate: PropTypes.bool,
    clubAdvisor: PropTypes.bool,
    clubs: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  bridge: PropTypes.shape().isRequired,
};

export default ProfileCard;
