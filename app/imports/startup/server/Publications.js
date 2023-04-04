import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});

Meteor.publish('students', function () {
  if (Roles.userIsInRole(this.userId, 'faculty')) {
    return StudentProfiles.find({}, { fields: { email: 1, firstName: 1, lastName: 1, TA: 1, RA: 1 } });
  }
  return this.ready();
});
