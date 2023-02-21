import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const roomPublications = {
  roomPub: 'roomPub',
};

class RoomCollection extends BaseCollection {
  constructor() {
    super('Room', new SimpleSchema({
      num: String,
      description: String,
      status: { type: String, allowedValues: ['open', 'occupied', 'maintenance'], defaultValue: 'open' },
    }));
  }

  /**
   * Defines a new Room item.
   * @return {never} the docID of the new document.
   * @param num
   * @param description
   * @param status
   */
  define({ num, description, status }) {
    const docID = this._collection.insert({
      num,
      description,
      status,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param num the new num (optional).
   * @param description the new description (optional).
   * @param status the new status (optional).
   * @returns never
   */
  update(docID, { num, description, status }) {
    const updateData = {};
    if (num) {
      updateData.num = num;
    }
    if (description) {
      updateData.description = description;
    }
    if (status) {
      updateData.status = status;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } num A document or docID in this collection.
   * @returns true
   */
  removeIt(num) {
    const doc = this.findDoc(num);
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
      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(roomPublications.roomPub, function publish() {
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
  subscribeRoom() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomPublications.roomPub);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT, ROLE.ADVISOR]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{num: *, description: *, status: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const num = doc.num;
    const description = doc.description;
    const status = doc.status;
    return { num, description, status };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Room = new RoomCollection();
