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

    const currentStudent = StudentProfiles.findOne(studentId);
    let update;

    if (role === 'ta') {
      update = { TA: !currentStudent.TA, RA: currentStudent.RA };
    } else if (role === 'ra') {
      update = { TA: currentStudent.TA, RA: !currentStudent.RA };
    } else {
      throw new Meteor.Error('invalid-role');
    }

    StudentProfiles.update(studentId, update);
  },
});
