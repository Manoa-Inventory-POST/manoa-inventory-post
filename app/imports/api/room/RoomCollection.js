import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Phone } from './Phone';

export const roomPublications = {
  roomPub: 'roomPub',
};

class RoomCollection extends BaseCollection {
  constructor() {
    super('Room', new SimpleSchema({
      room: String,
      description: String,
      building: String,
      status: { type: String, allowedValues: ['open', 'occupied', 'maintenance'], defaultValue: 'open' },
    }));
  }

  /**
   * Defines a new Room item.
   * @return {never} the docID of the new document.
   * @param room
   * @param description
   * @param status
   */
  define({ room, description, building, status, phones }) {
    if (phones) {
      // checks if phones exist
      phones.forEach(phoneNum => {
        // if exists, update
        if (Phone.checkExists(phoneNum)) {
          const phoneID = Phone.findDoc({ phoneNum })._id;
          Phone.update(phoneID, { room });
        // else, define new phone
        } else {
          Phone.define({ room, phoneNum });
        }
      });
    }
    const docID = this._collection.insert({
      room,
      description,
      building,
      status,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param room the new room (optional).
   * @param description the new description (optional).
   * @param status the new status (optional).
   * @returns never
   */
  update(docID, { room, description, building, status }) {
    const updateData = {};
    if (room) {
      updateData.room = room;
    }
    if (description) {
      updateData.description = description;
    }
    if (building) {
      updateData.building = building;
    }
    if (status) {
      updateData.status = status;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } room A document or docID in this collection.
   * @returns true
   */
  removeIt(room) {
    const doc = this.findDoc(room);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the room associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      // This subscription publishes only the documents associated with the logged-in user
      Meteor.publish(roomPublications.roomPub, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for room owned by the current user.
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{room: *, description: *, building: *, status: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const room = doc.room;
    const description = doc.description;
    const building = doc.building;
    const status = doc.status;
    return { room, description, building, status };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Room = new RoomCollection();
