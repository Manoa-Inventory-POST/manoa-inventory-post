import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const portRoomPublications = {
  portRoomPub: 'portRoomPub',
};

class PortRoomCollection extends BaseCollection {
  constructor() {
    super('PortRoom', new SimpleSchema({
      Port: String,
      Room: String,
    }));
  }

  /**
   * Defines a new ClubAdvisor item.
   * @return {never} the docID of the new document.
   * @param advisor
   * @param club
   */
  define({ room, port }) {
    const docID = this._collection.insert({
      room,
      port,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param advisor the new advisor (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { room, port }) {
    const updateData = {};
    if (room) {
      updateData.room = room;
    }
    if (port) {
      updateData.port = port;
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
   * It publishes the entire collection for users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ClubAdvisor instance.
      const instance = this;
      // This subscription publishes CLubAdvisors
      Meteor.publish(portRoomPublications.portRoomPub, function publish() {
        return instance._collection.find({ });
      });
    }
  }

  /*
   * Subscription method for ClubAdvisor.
   */
  subscribePortRoom() {
    if (Meteor.isClient) {
      return Meteor.subscribe(portRoomPublications.portroomPub);
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
   * @return {{advisor: *, club: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const room = doc.room;
    const port = doc.port;
    return { room, port };
  }
}

/*
 * Provides the singleton instance of this class to all other entities.
 */
export const PortRoom = new PortRoomCollection();
