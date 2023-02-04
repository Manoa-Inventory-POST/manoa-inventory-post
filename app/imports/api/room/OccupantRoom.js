import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const occupantRoomPublications = {
  // will be using "ORPub" as acronym for occupantRoomPublications
  ORPub: 'ORPub',
  ORPubAdmin: 'ORPubAdmin',
};

class OccupantRoomCollection extends BaseCollection {
  constructor() {
    super('OccupantRoom', new SimpleSchema({
      occupant: String,
      room: String,
    }));
  }

  /**
   * Defines a new OccupantRoom item.
   * @return {String} the docID of the new document.
   * @param occupant
   * @param room
   */
  define({ occupant, room }) {
    const docID = this._collection.insert({
      occupant,
      room,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param occupant the new occupant (optional).
   * @param room the new room (optional).
   * @returns never
   */
  update(docID, { occupant, room }) {
    const updateData = {};
    if (occupant) {
      updateData.occupant = occupant;
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
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(occupantRoomPublications.ORPubAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
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
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOccupantRoomAdmin() {
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT, ROLE.ADVISOR]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{occupant: *, room: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const occupant = doc.occupant;
    const room = doc.room;
    return { occupant, room };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OccupantRoom = new OccupantRoomCollection();
