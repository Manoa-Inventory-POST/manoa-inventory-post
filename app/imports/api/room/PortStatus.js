import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const portStatusPublications = {
  portStatusPub: 'portStatusPub',
};

class PortStatusCollection extends BaseCollection {
  constructor() {
    super('PortStatus', new SimpleSchema({
      Port: String,
      Status: { type: String, allowedValues: ['active', 'inactive', 'maintenance'], defaultValue: 'inactive' },
    }));
  }

  /**
   * Defines a new ClubAdvisor item.
   * @return {never} the docID of the new document.
   * @param advisor
   * @param club
   */
  define({ status, port }) {
    const docID = this._collection.insert({
      status,
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
  update(docID, { status, port }) {
    const updateData = {};
    if (status) {
      updateData.status = status;
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
      Meteor.publish(portStatusPublications.portStatusPub, function publish() {
        return instance._collection.find({ });
      });
    }
  }

  /*
   * Subscription method for ClubAdvisor.
   */
  subscribePortStatus() {
    if (Meteor.isClient) {
      return Meteor.subscribe(portStatusPublications.portStatusPub);
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
    const status = doc.status;
    const port = doc.port;
    return { status, port };
  }
}

/*
 * Provides the singleton instance of this class to all other entities.
 */
export const PortStatus = new PortStatusCollection();
