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
  'users.generateResetToken'(email, securityQuestion, securityAnswer) {
    check(email, String);
    check(securityQuestion, String);
    check(securityAnswer, String);
    const student = StudentProfiles.find({ email }).fetch()[0];

    if (!student) {
      throw new Meteor.Error('Student not found');
    }

    const securityQuestionObj = student.securityQuestions.find(sq => sq.question === securityQuestion);

    if (!securityQuestionObj || securityQuestionObj.answer !== securityAnswer) {
      throw new Meteor.Error('Invalid security question or answer');
    }

    // Generate a token and store it in the user's document
    const token = crypto.randomBytes(16).toString('hex');
    Meteor.users.update({ _id: student.userID }, { $set: { 'services.password.resetToken': token } });

    return token;
  },

  'users.verifySecurityQuestion'(email, securityQuestion, securityAnswer) {
    check(email, String);
    check(securityQuestion, String);
    check(securityAnswer, String);
    const user = Accounts.findUserByEmail(email);

    if (!user) {
      throw new Meteor.Error('User not found');
    }

    if (user.profile.securityQuestion !== securityQuestion || user.profile.securityAnswer !== securityAnswer) {
      throw new Meteor.Error('Invalid security question or answer');
    }
  },
  'users.resetPasswordWithToken'(token, newPassword) {
    check(token, String);
    check(newPassword, String);
    const user = Meteor.users.findOne({ 'services.password.resetToken': token });

    if (!user) {
      throw new Meteor.Error('Invalid token');
    }

    Accounts.setPassword(user._id, newPassword);
    Meteor.users.update(user._id, { $unset: { 'services.password.resetToken': '' } });
  },
});
