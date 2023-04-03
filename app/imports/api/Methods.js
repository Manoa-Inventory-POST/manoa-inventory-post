import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { StudentProfiles } from './user/StudentProfileCollection';

Meteor.methods({
  'students.setRole': function (studentId, role) {
    check(studentId, String);
    check(role, String);

    if (!this.userId || !Roles.userIsInRole(this.userId, 'FACULTY')) {
      throw new Meteor.Error('not-authorized');
    }

    let update;

    if (role === 'ta') {
      update = { TA: true, RA: false };
    } else if (role === 'ra') {
      update = { TA: false, RA: true };
    } else if (role === 'none') {
      update = { TA: false, RA: false };
    } else {
      throw new Meteor.Error('invalid-role');
    }

    StudentProfiles.update(studentId, update);
  },
});
