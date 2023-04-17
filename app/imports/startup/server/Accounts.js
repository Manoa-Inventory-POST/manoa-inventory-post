import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, password) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else if (role === ROLE.ITSUPPORT) {
    ITSupportProfiles.define({ email, firstName, lastName, password });
  } else if (role === ROLE.OFFICE) {
    OfficeProfiles.define({ email, firstName, lastName, password });
  } else if (role !== ROLE.STUDENT && role !== ROLE.FACULTY) { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password });
  }
}

function createStudent(email, role, firstName, lastName, TA, RA, graduate, undergraduate, password, clubs, interests) {
  if (role === ROLE.STUDENT) {
    StudentProfiles.define({ email, firstName, lastName, TA, RA, graduate, undergraduate, password, clubs, interests });
  }
}

function createFaculty(email, role, firstName, lastName, officeHours, position, picture, emergencyPhone, emergencyEmail, password, rooms, phones) {
  if (role === ROLE.FACULTY) {
    FacultyProfiles.define({ email, firstName, lastName, officeHours, position, picture, emergencyPhone, emergencyEmail, password, rooms, phones });
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  const defaultData = Meteor.settings.defaultAccounts;
  if (defaultData) {
    console.log('Creating the default user(s)');
    defaultData.map(({ email, password, role, firstName, lastName }) => createUser(email, role, firstName, lastName, password));
    defaultData.map(({ email, role, firstName, lastName, TA, RA, graduate, undergraduate, password, clubs, interests }) => createStudent(email, role, firstName, lastName, TA, RA, graduate, undergraduate, password, clubs, interests));
    // eslint-disable-next-line max-len
    defaultData.map(({ email, role, firstName, lastName, officeHours, position, picture, emergencyPhone, emergencyEmail, password, rooms, phones }) => createFaculty(email, role, firstName, lastName, officeHours, position, picture, emergencyPhone, emergencyEmail, password, rooms, phones));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
