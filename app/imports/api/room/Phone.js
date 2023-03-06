import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const phonePublications = {
  phonePub: 'phonePub',
};

class PhoneCollection extends BaseCollection {
  constructor() {
    super('Phone', new SimpleSchema({
      email: { type: String, optional: true },
      room: { type: String, optional: true },
      phoneNum: String,
    }));
  }

  /**
   * Defines a new Phone item.
   * @return {never} the docID of the new document.
   * @param email
   * @param room
   * @param phoneNum
   */
  define({ email, room, phoneNum }) {
    const docID = this._collection.insert({
      email,
      room,
      phoneNum,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param email the new email (optional).
   * @param phoneNum the new phoneNum (optional).
   * @returns never
   */
  update(docID, { email, room, phoneNum }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (room) {
      updateData.room = room;
    }
    if (phoneNum) {
      updateData.phoneNum = phoneNum;
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

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the phone instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(phonePublications.phonePub, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribePhone() {
    if (Meteor.isClient) {
      return Meteor.subscribe(phonePublications.phonePub);
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
   * @return {{email: *, phoneNum: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const room = doc.room;
    const phoneNum = doc.phoneNum;
    return { email, room, phoneNum };
  }

  /**
   * Checks the Phone collection to see if an inputted Phone already exists.
   * @param phone
   * @return true
   * @return false
   */
  checkExists(phoneNum) {
    const instances = this.find({ phoneNum }).count();
    if (instances === 0) {
      return false;
    }
    return true;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Phone = new PhoneCollection();
