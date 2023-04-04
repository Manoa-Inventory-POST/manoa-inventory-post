import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';
import { UserClubs } from '../clubs/UserClubs';
import { UserInterests } from '../clubs/UserInterests';
import {Phone} from "../room/Phone";

class StudentProfileCollection extends BaseProfileCollection {
  constructor() {
    super('StudentProfile', new SimpleSchema({
      TA: { type: Boolean, defaultValue: false },
      RA: { type: Boolean, defaultValue: false },
      graduate: { type: Boolean, defaultValue: false },
      undergraduate: { type: Boolean, defaultValue: false },
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param TA True if student is a TA, default is false.
   * @param RA True if student is an RA, default is false.
   * @param graduate True if graduate student, default is false.
   * @param undergraduate True if undergraduate student, default is false.
   */
  define({ email, firstName, lastName, TA, RA, graduate, undergraduate, phones, password, clubs, interests }) {
    // if (Meteor.isServer) {
    const username = email;
    const user = this.findOne({ email, firstName, lastName, TA, RA, graduate, undergraduate }, {});
    if (!user) {
      const role = ROLE.STUDENT;
      const userID = Users.define({ username, role, password });
      // const clubs = UserClubs.define({ email, Clubs.dumpOne().name});
      const profileID = this._collection.insert({ email, firstName, lastName, TA, RA, graduate, undergraduate, userID, role });
      if (clubs) {
        clubs.forEach((club) => UserClubs.define({ email, club }));
      }
      if (interests) {
        interests.forEach((interest) => UserInterests.define({ email, interest }));
      }
      if (phones) {
        // checks if phones exist
        phones.forEach(phoneNum => {
          // if exists, update
          if (Phone.checkExists(phoneNum)) {
            const phoneID = Phone.findDoc({ phoneNum })._id;
            Phone.update(phoneID, { email });
            // else, define new phone
          } else {
            Phone.define({ email, phoneNum });
          }
        });
      }
      return profileID;
    }
    return user._id;
    // }
    // return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param TA update TA sub role (optional).
   * @param RA update RA sub role (optional).
   * @param graduate update graduate sub role (optional).
   * @param undergraduate update undergraduate sub role (optional).
   * @return never
   */
  update(docID, { firstName, lastName, email, phones, phoneIds, TA, RA, graduate, undergraduate }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (phones) {
      updateData.phones = phones;
      // remove all
      if (phoneIds) {
        phoneIds.forEach(id => {
          Phone.removeIt(id);
        });
      }
      // re-create all phones
      if (phones.length > 0) {
        for (let i = 0; i < phones.length; i++) {
          // if exists, update
          const phoneNum = phones[i];
          if (Phone.checkExists(phoneNum)) {
            const phoneID = Phone.findDoc({ phoneNum })._id;
            Phone.update(phoneID, { email });
            // else, define new phone
          } else {
            Phone.define({ email, phoneNum });
          }
        }
      }
    }
    if (TA) {
      updateData.TA = TA;
    }
    if (RA) {
      updateData.RA = RA;
    }
    if (graduate) {
      updateData.graduate = graduate;
    }
    if (undergraduate) {
      updateData.undergraduate = undergraduate;
    }
    console.log('update DATA:');
    console.log(updateData);
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.STUDENT) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns {{firstName: *, lastName: *, graduate: *, TA: *, email: *, undergraduate: *, RA: *}} An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const TA = doc.TA;
    const RA = doc.RA;
    const graduate = doc.graduate;
    const undergraduate = doc.undergraduate;
    return { email, firstName, lastName, TA, RA, graduate, undergraduate }; // CAM this is not enough for the define method. We lose the password.
  }

  /**
   * Searches for a User ID. If ID exists, returns the User Object. Else, there is no profile.
   * @returns { Object } A profile.
   */
  getData() {
    const profile = this.find({ userID: Meteor.userID }).fetch();
    if (profile.isEmpty()) {
      return [];
    }
    return profile[0];
  }

}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {StudentProfileCollection}
 */
export const StudentProfiles = new StudentProfileCollection();
