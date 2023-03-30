import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const occupantRoomPublications = {
  ORPub: 'ORPub',
};

class OccupantRoomCollection extends BaseCollection {
  constructor() {
    super('OccupantRoom', new SimpleSchema({
      email: String,
      room: String,
    }));
  }

  /**
   * Defines a new OccupantRoom item.
   * @return {never} the docID of the new document.
   * @param email
   * @param room
   */
  define({ email, room }) {
    const docID = this._collection.insert({
      email,
      room,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param email the new email (optional).
   * @param room the new room (optional).
   * @returns never
   */
  update(docID, { email, room }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (room) {
      updateData.room = room;
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
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(occupantRoomPublications.ORPub, function publish() {
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
  subscribeOccupantRoom() {
    if (Meteor.isClient) {
      return Meteor.subscribe(occupantRoomPublications.ORPub);
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
   * @return {{email: *, room: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const room = doc.room;
    return { email, room };
  }

  /**
   * Checks the OccupantRoom collection to see if an inputted room occupant already exists.
   * @param email
   * @param room
   * @return true
   * @return false
   */
  checkExists(email, room) {
    const instances = this.find({ email, room }, {}).count();
    if (instances === 0) {
      return false;
    }
    return true;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OccupantRoom = new OccupantRoomCollection();
