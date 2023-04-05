import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';
import {Phone} from "../room/Phone";

class AdminProfileCollection extends BaseProfileCollection {
  constructor() {
    super('AdminProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an Admin and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   */
  define({ email, firstName, lastName, password, phones }) {
    if (Meteor.isServer) {
      // console.log('define', email, firstName, lastName, password);
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.ADMIN;
        const profileID = this._collection.insert({ email, firstName, lastName, userID: this.getFakeUserId(), role });
        const userID = Users.define({ username, role, password });
        this._collection.update(profileID, { $set: { userID } });
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
    }
    return undefined;
  }

  /**
   * Updates the AdminProfile. You cannot change the email or role.
   * @param docID the id of the AdminProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */
  // update(docID, { firstName, lastName }) {
  update(docID, { firstName, lastName, email, phones, phoneIds }) {

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
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Admin.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or Admin.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN]);
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
      if (doc.role !== ROLE.ADMIN) {
        problems.push(`AdminProfile instance does not have ROLE.ADMIN: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the AdminProfile docID in a format acceptable to define().
   * @param docID The docID of a AdminProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName }; // CAM this is not enough for the define method. We lose the password.
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
 * @type {AdminProfileCollection}
 */
export const AdminProfiles = new AdminProfileCollection();
