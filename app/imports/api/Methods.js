import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { StudentProfiles } from './user/StudentProfileCollection';

Meteor.methods({
  'students.setRole': function (studentId, role) {
    check(studentId, String);
    check(role, String);

    if (!this.userId || !Roles.userIsInRole(this.userId, 'faculty')) {
      throw new Meteor.Error('not-authorized');
    }

    if (['ta', 'ra'].includes(role)) {
      const update = role === 'ta' ? { TA: true, RA: false } : { TA: false, RA: true };
      StudentProfiles.update(studentId, { $set: update });
    } else {
      throw new Meteor.Error('invalid-role');
    }
  },
});
