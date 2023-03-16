import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { removeItMethod } from '../../api/base/BaseCollection.methods';

const PeopleSearchResultsTableRow = ({ user }) => {

  const deleteUser = () => {
    let collectionName;
    let instance;
    let docId;
    switch (user.role) {
    case 'ADMIN':
      console.log('ADMIN SWITCH');
      collectionName = AdminProfiles.getCollectionName();
      console.log(collectionName);
      console.log(user);
      instance = AdminProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    case 'FACULTY':
      console.log('FACULTY SWITCH');
      collectionName = FacultyProfiles.getCollectionName();
      console.log(user);
      instance = FacultyProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    case 'USER':
      console.log('USER SWITCH');
      collectionName = UserProfiles.getCollectionName();
      console.log(user);
      instance = UserProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    case 'STUDENT':
      console.log('STUDENT SWITCH');
      collectionName = StudentProfiles.getCollectionName();
      console.log(user);
      instance = StudentProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    case 'OFFICE':
      console.log('OFFICE SWITCH');
      collectionName = OfficeProfiles.getCollectionName();
      console.log(user);
      instance = OfficeProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
      console.log('ITSUPPORT SWITCH');
      collectionName = ITSupportProfiles.getCollectionName();
      console.log(user);
      instance = ITSupportProfiles.findOne({ firstName: user.firstName, lastName: user.lastName, role: user.role }, {});
      console.log(instance);
      docId = instance._id;
      console.log(docId);
      removeItMethod.callPromise({ collectionName, instance: docId })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin removed successfully', 'success');
        });
      break;
    default:
      break;
    }

  };

  return (
    <tr>
      <td>{ user.firstName }</td>
      <td>{ user.lastName }</td>
      <td>{ user.room }</td>
      <td>{ user.phones }</td>
      <td>{ user.role }</td>
      <td className="d-flex">
        <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editUser/${user._id}`}>Edit</Link>
        <Button className="btn btn-danger btn-delete d-inline" onClick={deleteUser}>Delete</Button>
      </td>
    </tr>
  );
};

PeopleSearchResultsTableRow.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    room: PropTypes.string,
    _id: PropTypes.string,
    phones: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default PeopleSearchResultsTableRow;
