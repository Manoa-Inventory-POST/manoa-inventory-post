import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const portPublications = {
  // will be using "portPub" as acronym for portPublications
  portPub: 'portPub',
};

class PortsCollection extends BaseCollection {
  constructor() {
    super('Ports', new SimpleSchema({
      name: String,
      room: String,
      status: { type: String, allowedValues: ['active', 'inactive', 'maintenance'], defaultValue: 'inactive' },
    }));
  }

  /**
   * Defines a new Ports item.
   * @return {never} the docID of the new document.
   * @param name
   * @param room
   * @param status
   */
  define({ name, room, status }) {
    const docID = this._collection.insert({
      name,
      room,
      status,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param room the new room (optional).
   * @param status the new status (optional).
   * @returns never
   */
  update(docID, { name, room, status }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (room) {
      updateData.room = room;
    }
    if (status) {
      updateData.status = status;
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
      Meteor.publish(portPublications.portPub, function publish() {
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
  subscribePorts() {
    if (Meteor.isClient) {
      return Meteor.subscribe(portPublications.portPub);
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
   * @return {{room: *, status: *, name: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const room = doc.room;
    const status = doc.status;
    return { name, room, status };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Ports = new PortsCollection();
