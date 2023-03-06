import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const interestsPublications = {
  interestsPub: 'interestsPub',
};

class InterestsCollection extends BaseCollection {
  constructor() {
    super('Interests', new SimpleSchema({
      interest: String,
    }));
  }

  /**
   * Defines a new Interests item.
   * @return {never} the docID of the new document.
   * @param interest
   * @param club
   */
  define({ interest }) {
    const docID = this._collection.insert({
      interest,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param interest the new interest (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { interest }) {
    const updateData = {};
    if (interest) {
      updateData.interest = interest;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /*
   * Default publication method for entities.
   * It publishes the entire collection for users
   */
  publish() {
    if (Meteor.isServer) {
      // get the Interests instance.
      const instance = this;
      // This subscription publishes Interests.
      Meteor.publish(interestsPublications.interestsPub, function publish() {
        if (this.userId) {
          return instance._collection.find({ });
        }
        return this.ready();
      });
    }
  }

  /*
   * Subscription method for Interests.
   */
  subscribeInterests() {
    if (Meteor.isClient) {
      return Meteor.subscribe(interestsPublications.interestsPub);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{interest: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const interest = doc.interest;
    return { interest };
  }

  /**
   * Checks the Interest collection to see if an inputted Interest already exists.
   * @param interest
   * @return true
   * @return false
   */
  checkExists(interest) {
    const instances = this.find({ interest: interest }).count();
    if (instances === 0) {
      return false;
    }
    return true;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Interests = new InterestsCollection();
