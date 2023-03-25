import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const officeRequestConditions = ['approve', 'disapprove', 'depending'];
export const officePublications = {
  office: 'office',
};

class OfficeRequestCollection extends BaseCollection {
  constructor() {
    super('OfficeRequest', new SimpleSchema({
      description: String,
      condition: {
        type: String,
        allowedValues: officeRequestConditions,
        defaultValue: 'depending',
      },
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param condition the condition of the item.
   * @param description the description of the request.
   */
  define({ email, firstName, lastName, condition, description }) {
    const docID = this._collection.insert({
      email,
      firstName,
      lastName,
      condition,
      description,
    });
    return docID;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param condition the condition.
   * @param description the description of the request.
   */
  update(docID, { firstName, lastName, condition, description }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (condition) {
      updateData.condition = condition;
    }
    if (description) {
      updateData.description = description;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(email) {
    const doc = this.findDoc(email);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      // This subscription publishes only the documents associated with the logged-in user
      Meteor.publish(officePublications.office, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeOffice() {
    if (Meteor.isClient) {
      return Meteor.subscribe(officePublications.office);
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
    return true;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const condition = doc.condition;
    const description = doc.description;
    return { email, firstName, lastName, condition, description }; // CAM this is not enough for the define method. We lose the password.
  }
}

export const OfficeRequests = new OfficeRequestCollection();
